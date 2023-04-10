import { NextFunction, Request, Response } from "express";
import invariant from "tiny-invariant";
import AUCTION_END_BUFFER from "src/constants/AuctionEndBuffer";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import dayjs from "src/utils/dates/dayjsex";
import getImgixUrl from "src/utils/getImgixUrl";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";

async function inner(req: Request, res: Response) {
  const { mintAddress } = req.query;
  const prisma = getPrisma();

  const nft = await prisma.nft.findUnique({
    include: {
      ...CONVERT_NFT_TO_METADATA_INCLUDE,
      NftTransaction: {
        include: {
          From: {
            include: CONVERT_USER_INCLUDE,
          },
        },
        orderBy: NFT_TRANSACTION_ORDER_BY,
        take: 500,
        where: {
          type: {
            in: [
              NftTransactionTypeExpress_Enum.AuctionWon,
              NftTransactionTypeExpress_Enum.Bid,
              NftTransactionTypeExpress_Enum.Listed,
            ],
          },
        },
      },
    },
    where: {
      mint: mintAddress as string,
    },
  });
  invariant(nft != null, "Must not be null");

  const txs = nft.NftTransaction;

  const auctionCount =
    nft.status === NftStatusExpress_Enum.Auction
      ? nft.auctionCount
      : nft.auctionCount - 1;

  const bidsForAuction = txs.filter(
    (tx) =>
      tx.type === NftTransactionTypeExpress_Enum.Bid &&
      tx.auctionCount === auctionCount
  );

  if (bidsForAuction.length === 0) {
    res.json({ errorMessage: "This NFT has not had any auctions" });
    return;
  }

  const startTime = [...txs]
    .reverse()
    .find(
      (tx) =>
        tx.type === NftTransactionTypeExpress_Enum.Bid &&
        tx.auctionCount === auctionCount
    )!.timeCreated;

  const auctionWonTx = txs.find(
    (tx) => tx.type === NftTransactionTypeExpress_Enum.AuctionWon
  );
  const endTime =
    nft.status === NftStatusExpress_Enum.Auction
      ? nft.NftListing?.auctionEndTime
      : auctionWonTx?.timeCreated == null
      ? null
      : // Not the most exact, but should be pretty close
        dayjs(auctionWonTx.timeCreated).subtract(AUCTION_END_BUFFER);

  const reserve = txs.find(
    (tx) =>
      tx.type === NftTransactionTypeExpress_Enum.Listed &&
      tx.auctionCount === auctionCount
  )!.price;

  const highestBid = txs.find(
    (tx) => tx.type === NftTransactionTypeExpress_Enum.Bid
  );

  const converted = {
    artistName: nft.Creator.username,
    endTime,
    highestBid: highestBid!.price?.toString(),
    highestBidder: highestBid!.fromUserId,
    highestBidderUsername: highestBid!.From?.username,
    image: getImgixUrl(nft.NftMetadata.image),
    isSecondary: highestBid!.auctionCount > 0,
    mintAddress: nft.mint,
    name: nft.NftMetadata.name,
    numberOfBids: bidsForAuction.length,
    reserve: reserve?.toString(),
    startTime,
  };

  res.json({ info: converted });
}

/**
 * Fetches info for most recent (or ongoing) auction.
 */
export default async function getLastAuctionInfo(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  try {
    await inner(req, res);
  } catch (e) {
    logError(AnalyticsEvent.GetLastAuctionInfoError, e as Error, req);

    res.sendStatus(500);
  }
}
