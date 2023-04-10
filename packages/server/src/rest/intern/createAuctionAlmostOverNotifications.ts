import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import { Currency, Nft, NftListing, NftMetadata, User } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import bigintToNumber from "src/utils/bigintToNumber";
import pLimit from "p-limit";
import { UnitTypeLong } from "dayjs";
import createBidderAuctionAlmostOverNotifications from "src/utils/notifications/create/createBidderAuctionAlmostOverNotifications";
import convertPrice from "src/utils/convert/convertPrice";

const limit = pLimit(5);

async function createNotificationsForAuction(
  nft: Nft & {
    Creator: User;
    NftListing: Maybe<NftListing & { Currency: Currency }>;
    NftMetadata: NftMetadata;
  },
  duration: number,
  durationUnit: UnitTypeLong
) {
  const prisma = getPrisma();
  const nftListing = nft.NftListing!;
  const bids = await prisma.nftTransaction.findMany({
    include: {
      From: true,
    },
    where: {
      auctionCount: nft.auctionCount,
      mint: nft.mint,
      type: NftTransactionTypeExpress_Enum.Bid,
    },
  });

  const notifData = {
    nftMint: nft.mint,
    price: convertPrice(
      bigintToNumber(nftListing.priceInLamports!)!,
      nftListing.Currency
    )!,
    timeLeftInSeconds: dayjs.duration({ [durationUnit]: duration }).asSeconds(),
  };
  await createBidderAuctionAlmostOverNotifications(
    bids.map((bid) => ({
      data: notifData,
      receiverId: bid.fromUserId,
      senderId: nft.ownerId,
    }))
  );
}

/**
 * Creates notifications for bidders of auctions with less than one hour left.
 */
export default async function createAuctionAlmostOverNotifications(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  // These params control when the email is sent.
  const duration = (req.body.duration ?? 1) as number;
  const durationUnit = (req.body.durationUnit ?? "hour") as UnitTypeLong;

  const prisma = getPrisma();
  const auctionsAlmostOver = await prisma.nft.findMany({
    include: {
      Creator: true,
      NftListing: {
        include: {
          Currency: true,
        },
      },
      NftMetadata: true,
    },
    where: {
      NftListing: {
        // Only include auctions whose duration is longer than the reminder duration
        auctionDurationInSeconds: {
          gt: dayjs.duration({ [durationUnit]: duration }).asSeconds(),
        },
        auctionEndTime: {
          gt: dayjs().toDate(),
          lt: dayjs()
            .add(dayjs.duration({ [durationUnit]: duration }))
            .toDate(),
        },
        // Don't send duplicate emails. This gets reset to null when an NFT is sold.
        timeLastAuctionAlmostOverEmailSent: null,
      },
      // Rough check to make sure there are bidders
      NftTransaction: {
        some: {
          timeCreated: {
            gte: dayjs()
              .subtract(dayjs.duration({ hours: 72 }))
              .toDate(),
          },
          type: NftTransactionTypeExpress_Enum.Bid,
        },
      },
      status: NftStatusExpress_Enum.Auction,
    },
  });

  await Promise.all(
    auctionsAlmostOver.map((nft) =>
      limit(() => createNotificationsForAuction(nft, duration, durationUnit))
    )
  );

  // Update all the NFTs, even if emails fail to send.
  // We do this because sendPostmarkEmailWithTemplateId only returns true if ALL emails send successfully.
  // But if only one email fails, we don't want to send duplicate emails to everyone else.
  // Since Postmark is pretty robust, this approach should work well in most cases.
  await prisma.nftListing.updateMany({
    data: {
      timeLastAuctionAlmostOverEmailSent: dayjs().toDate(),
    },
    where: {
      nftId: {
        in: auctionsAlmostOver.map((nft) => nft.mint),
      },
    },
  });

  res.json({
    duration,
    durationUnit,
    message: `Sent reminder emails for ${auctionsAlmostOver.length} auctions`,
    mints: auctionsAlmostOver.map((nft) => nft.mint),
  });
}
