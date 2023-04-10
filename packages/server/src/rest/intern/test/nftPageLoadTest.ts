import { NextFunction, Request, Response } from "express";
import metadataAccountForMintResolver from "src/resolvers/query/metadataAccountForMintResolver";
import editionsForMasterEditionMintConnectionResolver from "src/resolvers/query/nested/editionsForMasterEditionMintConnectionResolver";
import nftOffersConnectionResolver from "src/resolvers/query/nested/nftOffersConnectionResolver";
import nftTransactionsConnectionResolver from "src/resolvers/query/nested/nftTransactionsConnectionResolver";
import pnftAuctionNftsResolver from "src/resolvers/query/pnftAuctionNftsResolver";
import getPrisma from "src/utils/prisma/getPrisma";

// Simulates the query in useNftPageEditions
async function editionsQuery(mint: string) {
  return editionsForMasterEditionMintConnectionResolver(undefined, "0", 100, {
    masterEditionMint: mint,
  });
}

// Simulates the query in useNftPageNft
async function nftQuery(mint: string) {
  return metadataAccountForMintResolver(undefined, { mint });
}

// Simulates the query in useNftPageOffersTx
async function offersQuery(mint: string) {
  return nftOffersConnectionResolver(undefined, "0", 100, { mint });
}

// Simulates the query in useNftPagePnftAuctionNfts
async function pnftAuctionNftsQuery(mint: string) {
  return pnftAuctionNftsResolver({ masterEditionPnftId: mint });
}

// Simulates the query in useNftPageTxs
async function txsQuery(mint: string) {
  return nftTransactionsConnectionResolver(undefined, "0", 100, { mint });
}

function getQuery(num: number, mint: string) {
  switch (num) {
    case 0:
      return editionsQuery(mint);
    case 1:
      return nftQuery(mint);
    case 2:
      return offersQuery(mint);
    case 3:
      return pnftAuctionNftsQuery(mint);
    case 4:
      return txsQuery(mint);
    default:
      return null;
  }
}

/**
 * Simulates the queries involved in loading an NFT page.
 *
 * NOTE: queries for the same NFT's data every time. This is meant to
 * simulate the load on the website when there is a very popular NFT.
 *
 * NOTE: in practice, additional DB queries will be sent because we have
 * independent resolvers for some fields of MetadataAccountGqlType and NftGqlType
 *
 * NOTE: useNftPageClaims uses a Hasura query, which does not place load on our
 * server (although it does place load on our DB), so we do not include it here.
 */
export default async function nftPageLoadTest(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { num } = req.query;
  let { mint } = req.query;
  const prisma = getPrisma();
  if (mint == null) {
    mint = (await prisma.nft.findFirst())!.mint;
  }

  const query = getQuery(Number(num), String(mint));
  if (query != null) {
    await query;
  }

  res.sendStatus(200);
}
