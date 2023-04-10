import { NftTransaction } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { Maybe } from "graphql/jsutils/Maybe";
import invariant from "tiny-invariant";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import NoopResponse from "src/types/enums/NoopResponse";
import logError from "src/utils/analytics/logError";
import logEvent from "src/utils/analytics/logEvent";
import updateDistributorWithNewClaimants, {
  UpdatePnftDistributorInfo,
} from "src/utils/claims/updateDistributorWithNewClaimants";
import getNoopResponse from "src/utils/getNoopResponse";
import getPrisma from "src/utils/prisma/getPrisma";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import isLastRetry from "src/utils/hasura/isLastRetry";

function isPrimarySaleTransaction(
  req: Request,
  res: Response
): Maybe<NftTransaction> {
  const nftTransaction: NftTransaction = req.body.event.data.new;

  if (
    ![
      NftTransactionTypeExpress_Enum.AuctionWon,
      NftTransactionTypeExpress_Enum.Sold,
    ].includes(nftTransaction.type as NftTransactionTypeExpress_Enum)
  ) {
    res.json(getNoopResponse(NoopResponse.NonMatchingTransactionType));
    return null;
  }

  if (nftTransaction.auctionCount !== 0) {
    res.json(getNoopResponse(NoopResponse.NotPrimarySaleTransaction));
    return null;
  }

  return nftTransaction;
}

async function getUpdatePnftDistributorInfo(
  req: Request,
  res: Response
): Promise<Maybe<UpdatePnftDistributorInfo>> {
  const primarySaleTransaction = isPrimarySaleTransaction(req, res);

  if (primarySaleTransaction == null) {
    return null;
  }

  const prisma = getPrisma();
  const claims = await prisma.claim.findMany({
    where: {
      auctionNftId: primarySaleTransaction.mint,
    },
  });

  if (claims.length > 0 && claims.every((claim) => claim.proof != null)) {
    res.json(
      getNoopResponse(
        `No action taken for auction mint ${primarySaleTransaction.mint} - it already has claims with proofs.`
      )
    );
    return null;
  }

  const auctionNft = await prisma.nft.findFirst({
    include: {
      NftListing: true,
      NftMetadata: true,
    },
    where: {
      NftListing: { pnftIdForAuction: { not: null } },
      mint: primarySaleTransaction.mint,
    },
  });

  if (auctionNft == null) {
    res.json(getNoopResponse(NoopResponse.AuctionNftNull));
    return null;
  }
  invariant(
    auctionNft.NftListing?.pnftIdForAuction != null,
    "pnftIdForAuction cannot be null"
  );

  return {
    auctionNft,
    nftTransaction: primarySaleTransaction,
    pnftIdForAuction: auctionNft.NftListing.pnftIdForAuction,
  };
}

export default async function auctionWonUpdatePnftDrop(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const updatePnftDistributorInfo = await getUpdatePnftDistributorInfo(
    req,
    res
  );
  if (updatePnftDistributorInfo == null) {
    return;
  }

  try {
    const txid = await updateDistributorWithNewClaimants(
      req,
      updatePnftDistributorInfo
    );

    logEvent(AnalyticsEvent.UpdatePnftDropSuccess, req, { txid });
    res.json({ success: true, txid });
  } catch (err: any) {
    if (isLastRetry(req)) {
      logError(AnalyticsEvent.UpdatePnftDropFail, err, req, {
        updatePnftDistributorInfo,
      });
    }
    res.status(500).json({ success: false });
  }
}
