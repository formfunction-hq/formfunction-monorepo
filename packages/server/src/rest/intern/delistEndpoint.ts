import { PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getErrorPropertiesToLog from "formfn-shared/dist/utils/analytics/getErrorPropertiesToLog";
import findAta from "formfn-shared/dist/utils/solana/pdas/findAta";
import toObject from "formfn-shared/dist/utils/toObject";
import pLimit from "p-limit";
import OFFER_WITH_NFT_AND_TRANSACTION_INCLUDE from "src/constants/include/OfferWithNftAndTransactionInclude";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import cancelAndRefundOffer from "src/utils/offers/cancelAndRefundOffer";
import getPrisma from "src/utils/prisma/getPrisma";
import getAuctionHouseSdk from "src/utils/solana/getAuctionHouseSdk";
import getConnection from "src/utils/solana/getConnection";
import insertNftTransaction from "src/utils/transaction/insertNftTransaction";
import {
  CurrencyNameExpress_Enum,
  NftStatusExpress_Enum,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";

const parallelLimit = pLimit(10);

type Result = {
  fail: {
    count: number;
    results: Array<{
      error: any;
      id: string;
    }>;
  };
  success: {
    count: number;
    ids: Array<string>;
  };
};

async function cancelEditionListings(
  req: Request,
  limit?: number
): Promise<Result> {
  const prisma = getPrisma();
  const nfts = await prisma.nft.findMany({
    include: { NftListing: { include: { Currency: true } } },
    take: limit,
    where: {
      status: NftStatusExpress_Enum.ListedEditions,
    },
  });

  const connection = getConnection();
  const authorityKeypair = getAuthorityKeypair();
  const results = await Promise.all(
    nfts.map((nft) =>
      parallelLimit(async () => {
        const ownerKey = new PublicKey(nft.ownerId);
        const mintKey = new PublicKey(nft.mint);
        const auctionHouseSdk = getAuctionHouseSdk(
          nft.NftListing!.Currency.name as CurrencyNameExpress_Enum
        );
        const [ata] = await findAta(ownerKey, mintKey);
        const closeEditionDistributorTx =
          await auctionHouseSdk.closeEditionDistributorTokenAccount({
            mint: mintKey,
            owner: ownerKey,
            rentReceiver: authorityKeypair.publicKey,
            tokenReceiver: ata,
            wallet: authorityKeypair.publicKey,
          });

        try {
          const txid = await sendAndConfirmTransaction(
            connection,
            closeEditionDistributorTx,
            [authorityKeypair]
          );
          await insertNftTransaction(req, {
            creatorId: nft.creatorId,
            currencyName: nft.NftListing?.Currency
              .name as Maybe<CurrencyNameExpress_Enum>,
            fromUserId: nft.ownerId,
            mint: nft.mint,
            price: Number(nft.NftListing?.priceInLamports),
            toUserId: nft.ownerId,
            txid,
            type: NftTransactionTypeExpress_Enum.StoppedMintingForEditions,
          });

          return { mint: nft.mint, txid };
        } catch (e: any) {
          return { error: getErrorPropertiesToLog(e), mint: nft.mint };
        }
      })
    )
  );

  const successResults = results.filter((result) => result.error == null);
  const failureResults = results.filter((result) => result.error != null);

  return {
    fail: {
      count: failureResults.length,
      results: failureResults.map((res) => ({
        error: res.error ?? "",
        id: res.mint,
      })),
    },
    success: {
      count: successResults.length,
      ids: successResults.map((res) => res.mint),
    },
  };
}

async function cancelNonEditionListings(
  req: Request,
  statuses: Array<NftStatusExpress_Enum>,
  limit?: number
): Promise<Result> {
  const prisma = getPrisma();
  const nfts = await prisma.nft.findMany({
    include: { NftListing: { include: { Currency: true } } },
    take: limit,
    where: {
      status: {
        in: statuses,
      },
    },
  });

  const connection = getConnection();
  const authorityKeypair = getAuthorityKeypair();
  const results = await Promise.all(
    nfts.map((nft) =>
      parallelLimit(async () => {
        const auctionHouseSdk = getAuctionHouseSdk(
          nft.NftListing!.Currency.name as CurrencyNameExpress_Enum
        );
        const sellerId = new PublicKey(nft.ownerId);
        const mintKey = new PublicKey(nft.mint);
        const [ata] = await findAta(sellerId, mintKey);
        const cancelTx = await auctionHouseSdk.cancelTx(
          {
            priceInLamports: Number(nft.NftListing!.priceInLamports),
            tokenAccount: ata,
            tokenMint: mintKey,
            wallet: sellerId,
          },
          {}
        );
        try {
          const txid = await sendAndConfirmTransaction(connection, cancelTx, [
            authorityKeypair,
          ]);
          await insertNftTransaction(req, {
            creatorId: nft.creatorId,
            currencyName: nft.NftListing?.Currency
              .name as Maybe<CurrencyNameExpress_Enum>,
            fromUserId: nft.ownerId,
            mint: nft.mint,
            price: Number(nft.NftListing?.priceInLamports),
            toUserId: nft.ownerId,
            txid,
            type: NftTransactionTypeExpress_Enum.ListingCancelled,
          });
          return { mint: nft.mint, txid };
        } catch (e: any) {
          return { error: getErrorPropertiesToLog(e), mint: nft.mint };
        }
      })
    )
  );

  const successResults = results.filter((result) => result.error == null);
  const failureResults = results.filter((result) => result.error != null);

  return {
    fail: {
      count: failureResults.length,
      results: failureResults.map((res) => ({
        error: res.error,
        id: res.mint,
      })),
    },
    success: {
      count: successResults.length,
      ids: successResults.map((res) => res.mint),
    },
  };
}

async function cancelAndRefundOffers(
  req: Request,
  limit?: number
): Promise<Result> {
  const prisma = getPrisma();
  const offers = await prisma.offer.findMany({
    include: OFFER_WITH_NFT_AND_TRANSACTION_INCLUDE,
    take: limit,
    where: { AND: [{ refundTxid: null }, { saleTransactionId: null }] },
  });

  const results = await Promise.all(
    offers.map((offer) =>
      parallelLimit(async () => cancelAndRefundOffer(req, offer))
    )
  );
  const successResults = results.filter((result) => result.success);
  const failureResults = results.filter((result) => !result.success);

  return {
    fail: {
      count: failureResults.length,
      results: failureResults.map((res) => ({
        error: res.errorMessage ?? "",
        id: res.id,
      })),
    },
    success: {
      count: successResults.length,
      ids: successResults.map((res) => res.id),
    },
  };
}

export default async function delistEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { offers, auctions, instantSales, editions, limit } = req.body;
  const cancelOffersResult =
    offers != null ? await cancelAndRefundOffers(req, limit) : "skipped";
  const cancelAuctionsResult =
    auctions != null
      ? await cancelNonEditionListings(
          req,
          [
            NftStatusExpress_Enum.Listed,
            NftStatusExpress_Enum.ListingScheduled,
          ],
          limit
        )
      : "skipped";
  const cancelInstantSalesResult =
    instantSales != null
      ? await cancelNonEditionListings(
          req,
          [NftStatusExpress_Enum.ListedInstantSale],
          limit
        )
      : "skipped";
  const cancelEditionsResult =
    editions != null ? await cancelEditionListings(req, limit) : "skipped";

  res.json(
    toObject({
      cancelAuctionsResult,
      cancelEditionsResult,
      cancelInstantSalesResult,
      cancelOffersResult,
    })
  );
}
