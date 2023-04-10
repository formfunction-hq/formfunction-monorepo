import { NextFunction, Request, Response } from "express";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import dayjs from "src/utils/dates/dayjsex";
import getImgixUrl from "src/utils/getImgixUrl";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import NFT_TRANSACTION_ORDER_BY from "src/constants/orderBy/NftTransactionOrderBy";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";

/**
 * Returns all currently live auctions.
 */
export default async function getAuctions(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { mintAddress } = req.query;
  const prisma = getPrisma();

  const nftsForAuction = await prisma.nft.findMany({
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
              NftTransactionTypeExpress_Enum.Bid,
              NftTransactionTypeExpress_Enum.Listed,
            ],
          },
        },
      },
    },
    where: {
      NftListing: {
        auctionEndTime: {
          gt: dayjs().toDate(),
        },
      },
      mint: (mintAddress as string) ?? undefined,
      status: NftStatusExpress_Enum.Auction,
    },
  });

  const converted = nftsForAuction.map((nft) => {
    const txs = nft.NftTransaction;

    const startTime =
      [...txs]
        .reverse()
        .find(
          (tx) =>
            tx.type === NftTransactionTypeExpress_Enum.Bid &&
            tx.auctionCount === nft.auctionCount
        )?.timeCreated ?? nft.NftListing?.scheduledAuctionTime;

    const endTime = nft.NftListing?.auctionEndTime;

    const reserve = txs.find(
      (tx) => tx.type === NftTransactionTypeExpress_Enum.Listed
    )!.price;

    const highestBid = txs.find(
      (tx) => tx.type === NftTransactionTypeExpress_Enum.Bid
    );

    const bidsForAuction = txs.filter(
      (tx) =>
        tx.type === NftTransactionTypeExpress_Enum.Bid &&
        tx.auctionCount === nft.auctionCount
    );

    return {
      artistName: nft.Creator.username,
      currencyMint: nft.NftListing?.Currency?.mint,
      endTime,
      highestBid: highestBid?.price?.toString(),
      highestBidder: highestBid?.fromUserId,
      highestBidderUsername: highestBid?.From?.username,
      image: getImgixUrl(nft.NftMetadata.image),
      isSecondary: nft.auctionCount > 0,
      mintAddress: nft.mint,
      name: nft.NftMetadata.name,
      numberOfBids: bidsForAuction.length,
      reserve: reserve?.toString(),
      startTime,
    };
  });

  res.json({ auctions: converted });
}
