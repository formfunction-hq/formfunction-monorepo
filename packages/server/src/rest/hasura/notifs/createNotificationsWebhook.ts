import { NextFunction, Request, Response } from "express";
import invariant from "tiny-invariant";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getPrisma from "src/utils/prisma/getPrisma";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import toObject from "formfn-shared/dist/utils/toObject";
import createNotificationForSeller from "src/rest/hasura/notifs/createNotificationForSeller";
import createNotificationForBuyer from "src/rest/hasura/notifs/createNotificationForBuyer";
import createNotificationsForBidders from "src/rest/hasura/notifs/createNotificationsForBidders";
import createNotificationsForFollowers from "src/rest/hasura/notifs/createNotificationsForFollowers";
import createNotificationForCreator from "src/rest/hasura/notifs/createNotificationForCreator";
import convertPrice from "src/utils/convert/convertPrice";
import bigintToNumber from "src/utils/bigintToNumber";

export async function getPrismaObjects(
  fromUserId: string,
  toUserId: string,
  mint: string,
  nftTransactionId?: string
) {
  const prisma = getPrisma();
  const [from, to, nft, tx] = await Promise.all([
    prisma.user.findUnique({
      where: { id: fromUserId },
    }),
    prisma.user.findUnique({
      where: { id: toUserId },
    }),
    prisma.nft.findUnique({
      include: {
        NftListing: true,
        NftMetadata: true,
      },
      where: { mint },
    }),
    nftTransactionId != null
      ? prisma.nftTransaction.findUnique({ where: { id: nftTransactionId } })
      : null,
  ]);
  invariant(from != null, "From must not be null");
  invariant(to != null, "To must not be null");
  invariant(nft != null, "NFT must not be null");

  return { from, nft, to, tx };
}

export default async function createNotificationsWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const {
    creatorId,
    currencyId,
    fromUserId,
    mint,
    source,
    timeCreated,
    toUserId,
    txid,
    type,
    id,
  } = body.event.data.new;

  if (type === NftTransactionTypeExpress_Enum.Transferred) {
    // We don't send any emails for this tx type
    res.json({ skipped: true, success: true });
    return;
  }

  const timeDiff = dayjs.duration({
    seconds: dayjs().diff(dayjs(timeCreated), "second", true),
  });
  if (timeDiff.asSeconds() > dayjs.duration({ minutes: 5 }).asSeconds()) {
    logError(
      AnalyticsEvent.CreateNotificationsWebhookTooLongDelay,
      `Tx was created ${timeDiff.asSeconds()} seconds ago, so not sending emails`,
      null,
      { tx: toObject(body.event.data.new) },
      source == null ? "warning" : "info"
    );
    res.json({ skipped: true, success: false });
    return;
  }

  const prisma = getPrisma();
  const transaction = await prisma.nftTransaction.findUnique({
    include: {
      Currency: true,
    },
    where: { id },
  });
  const price = convertPrice(
    bigintToNumber(transaction!.price),
    transaction!.Currency
  );

  await createNotificationForSeller(
    req,
    fromUserId,
    toUserId,
    mint,
    price,
    type,
    txid,
    id
  );
  await createNotificationForBuyer(
    req,
    fromUserId,
    toUserId,
    mint,
    price,
    type,
    id
  );
  await createNotificationsForBidders(
    req,
    creatorId,
    fromUserId,
    toUserId,
    mint,
    price,
    type,
    id,
    txid,
    currencyId
  );
  await createNotificationsForFollowers(
    req,
    creatorId,
    fromUserId,
    mint,
    price,
    type,
    id
  );
  await createNotificationForCreator({
    creatorId,
    fromUserId,
    mint,
    nftTransactionId: id,
    toUserId,
    type,
  });

  res.json({ success: true }).send();
}
