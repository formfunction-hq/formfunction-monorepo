import { Request, Response, NextFunction } from "express";
import invariant from "tiny-invariant";
import updateDistributorWithNewClaimants, {
  UpdatePnftDistributorInfo,
} from "src/utils/claims/updateDistributorWithNewClaimants";
import getNoopResponse from "src/utils/getNoopResponse";
import getPrisma from "src/utils/prisma/getPrisma";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

/**
 * We first look for the AuctionWon transaction. There is a race condition in
 * processFinishedAuctions regarding inserting AuctionWon transactions (they
 * won't be inserted if the artist settled the auction first), so if that
 * doesn't exist look for the Sold transaction instead.
 *
 * TODO[@][processFinishedAuctions]: Fix the race condition.
 */
async function getAuctionTransaction(mint: string) {
  const prisma = getPrisma();

  const auctionWonTx = await prisma.nftTransaction.findFirst({
    include: {
      Nft: {
        include: {
          NftListing: true,
          NftMetadata: true,
        },
      },
    },
    where: {
      auctionCount: 0,
      mint,
      type: NftTransactionTypeExpress_Enum.AuctionWon,
    },
  });

  if (auctionWonTx != null) {
    return auctionWonTx;
  }

  const soldTx = await prisma.nftTransaction.findFirst({
    include: {
      Nft: {
        include: {
          NftListing: true,
          NftMetadata: true,
        },
      },
    },
    where: {
      auctionCount: 0,
      mint,
      type: NftTransactionTypeExpress_Enum.Sold,
    },
  });

  return soldTx;
}

async function getUpdateDistributorArgsFromMint(
  mint: string
): Promise<Maybe<UpdatePnftDistributorInfo>> {
  const auctionTransaction = await getAuctionTransaction(mint);

  if (
    auctionTransaction == null ||
    auctionTransaction.Nft.NftListing?.pnftIdForAuction == null
  ) {
    return null;
  }

  return {
    auctionNft: auctionTransaction.Nft,
    nftTransaction: auctionTransaction,
    pnftIdForAuction: auctionTransaction.Nft.NftListing?.pnftIdForAuction,
  };
}

export default async function updateDistributorForAuctionMint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { mint } = req.body;
  invariant(typeof mint === "string");

  const updateArgs = await getUpdateDistributorArgsFromMint(mint);
  if (updateArgs == null) {
    res.json(
      getNoopResponse(
        "Did not find associated auction AuctionWon or Sold transactions for this mint. Are you sure this is a mint for a finished auction which has a participation NFT?"
      )
    );
    return;
  }

  try {
    const txid = await updateDistributorWithNewClaimants(req, updateArgs);
    res.json({ txid });
  } catch (err) {
    res.status(500).json({ err, success: false });
  }
}
