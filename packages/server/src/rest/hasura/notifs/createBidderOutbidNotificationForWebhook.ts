import { Request } from "express";
import invariant from "tiny-invariant";
import { getPrismaObjects } from "src/rest/hasura/notifs/createNotificationsWebhook";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getLatestOutbidUserWebhook from "src/utils/auction/getLatestOutbidUserWebhook";
import getPrisma from "src/utils/prisma/getPrisma";
import sleep from "formfn-shared/dist/utils/sleep";
import {
  NftTransactionTypeExpress_Enum,
  Price,
} from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import createBidderOutbidNotification from "src/utils/notifications/create/createBidderOutbidNotification";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default async function createBidderOutbidNotificationForWebhook(
  req: Request,
  creatorId: string,
  fromUserId: string,
  toUserId: string,
  mint: string,
  price: Maybe<Price>,
  type: string,
  nftTransactionId: string,
  txid: string,
  currencyId: string
) {
  // Sleep for a bit to avoid race conditions, since multiple bids may be placed at the same
  // time, and be inserted into our DB at slightly different times.
  await sleep(dayjs.duration({ seconds: 60 }));

  const outbidUserInfo = await getLatestOutbidUserWebhook(
    mint,
    txid,
    fromUserId
  );

  if (outbidUserInfo == null) {
    return;
  }

  const { nft } = await getPrismaObjects(fromUserId, toUserId, mint);
  const prisma = getPrisma();
  const outbidUser = await prisma.user.findUnique({
    where: { id: outbidUserInfo.userId },
  });
  invariant(outbidUser != null, "Outbid user must not be null");

  try {
    const refundTransaction = await prisma.nftTransaction.create({
      data: {
        Creator: {
          connect: {
            id: creatorId,
          },
        },
        Currency: {
          connect: {
            id: currencyId,
          },
        },
        From: {
          connect: {
            id: fromUserId,
          },
        },
        Nft: {
          connect: {
            id: nft.id,
          },
        },
        NftTransactionType: {
          connect: { value: NftTransactionTypeExpress_Enum.Refunded },
        },
        To: {
          connect: {
            id: outbidUser.id,
          },
        },
        auctionCount: nft.auctionCount,
        // TODO: fix this later
        // This is a hack to get around the unique constraint, since txid is the same as the bid txid.
        ixInnerIndex: 0,
        price: outbidUserInfo.bidPrice,
        txid,
      },
    });

    await createBidderOutbidNotification(
      {
        higherBidTransactionId: nftTransactionId,
        refundTransactionId: refundTransaction.id,
      },
      outbidUser.id,
      fromUserId
    );
  } catch (e) {
    logError(AnalyticsEvent.CreateNotificationsWebhookError, e as Error, req, {
      creatorId,
      fromUserId,
      mint,
      outbidUserInfo,
      price,
      toUserId,
      txid,
      type,
    });
  }
}
