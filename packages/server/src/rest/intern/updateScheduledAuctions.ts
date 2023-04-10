import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import dayjs from "src/utils/dates/dayjsex";
import { NftStatusExpress_Enum } from "src/__generated__/generated";
import logEvent from "src/utils/analytics/logEvent";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import {
  Currency,
  Nft,
  NftListing,
  NftMetadata,
  Prisma,
  User,
} from "@prisma/client";
import getFollowers from "src/utils/prisma/getFollowers";
import pLimit from "p-limit";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import createFollowerScheduledAuctionIsLiveNotifications from "src/utils/notifications/create/createFollowerScheduledAuctionIsLiveNotifications";
import bigintToNumber from "src/utils/bigintToNumber";
import convertPrice from "src/utils/convert/convertPrice";

const limit = pLimit(10);

async function createNotificationsForNft(
  nft: Nft & {
    Creator: User;
    NftListing: Maybe<NftListing & { Currency: Currency }>;
    NftMetadata: NftMetadata;
    Owner: User;
  }
) {
  const followers = await getFollowers(nft.creatorId);

  await createFollowerScheduledAuctionIsLiveNotifications(
    followers.map((follower) => ({
      data: {
        nftMint: nft.mint,
        price: convertPrice(
          bigintToNumber(nft.NftListing!.priceInLamports)!,
          nft.NftListing!.Currency
        )!,
      },
      receiverId: follower.id,
      senderId: nft.ownerId,
    }))
  );
}

/**
 * Checks all scheduled auctions, and changes statuses from ListingScheduled -> Auction for
 * auctions that have started.
 *
 * Also emails followers, notifying them that a scheduled auction has started.
 */
export default async function updateScheduledAuctions(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const prisma = getPrisma();
  const where: Prisma.NftWhereInput = {
    NftListing: {
      scheduledAuctionTime: {
        lte: dayjs().toDate(),
      },
    },
    status: NftStatusExpress_Enum.ListingScheduled,
  };

  const nftsToUpdate = await prisma.nft.findMany({
    include: {
      Creator: true,
      NftListing: {
        include: {
          Currency: true,
        },
      },
      NftMetadata: true,
      Owner: true,
    },
    where,
  });

  const updatedNfts = await prisma.nft.updateMany({
    data: {
      status: NftStatusExpress_Enum.Auction,
    },
    where,
  });

  const loggingPayload = {
    currentTime: dayjs().toString(),
    numUpdated: updatedNfts.count,
    updatedMints: nftsToUpdate.map((nft) => ({
      mint: nft.mint,
      scheduledAuctionTime: nft.NftListing?.scheduledAuctionTime?.toString(),
    })),
  };

  await Promise.all(
    nftsToUpdate.map((nft) => limit(() => createNotificationsForNft(nft)))
  );

  await logEvent(
    AnalyticsEvent.UpdateScheduledAuctionsSuccess,
    req,
    loggingPayload
  );

  res.json(loggingPayload);
}
