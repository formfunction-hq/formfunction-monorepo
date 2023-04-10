import { PublicKey } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import isLastRetry from "src/utils/hasura/isLastRetry";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import getPrisma from "src/utils/prisma/getPrisma";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";
import logEvent from "src/utils/analytics/logEvent";
import { constructMerkleEditionAllowlist } from "@formfunction-hq/formfunction-auction-house";
import loadAuctionHouseSdk from "src/utils/solana/loadAuctionHouseSdk";
import appendEditionsMerkleAllowlist from "src/utils/editions/appendEditionsMerkleAllowlist";

export default async function createOnchainAllowlistForEditionsWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { editionAllowlistEnabled, nftId } = body.event.data.new as {
    editionAllowlistEnabled: boolean;
    nftId: string;
  };

  if (!editionAllowlistEnabled) {
    res.json({ skipped: true });
    return;
  }

  const prisma = getPrisma();
  const allowlistEntries = await prisma.editionsMerkleAllowlistInfo.findMany({
    where: {
      nftId,
    },
  });
  const merkleAllowlist = constructMerkleEditionAllowlist(
    new PublicKey(nftId),
    allowlistEntries.map((entry) => ({
      address: new PublicKey(entry.userId),
      amount: entry.amountAllowed,
    }))
  );

  const auctionHouseSdk = loadAuctionHouseSdk(CurrencyNameExpress_Enum.Solana);
  try {
    let clearTxid;
    const authorityKeypair = getAuthorityKeypair();

    if (req.body.delivery_info.current_retry > 0) {
      // First, clear the existing allowlist if a previous attempt failed
      const clearTx = await auctionHouseSdk.clearEditionAllowlistMerkleRootsTx({
        mint: new PublicKey(nftId),
      });
      if (clearTx != null) {
        clearTxid = await ConnectionWrapper.sendAndConfirmTransaction(clearTx, [
          authorityKeypair,
        ]);
      }
    }

    const appendTxids = await appendEditionsMerkleAllowlist(
      req,
      merkleAllowlist,
      nftId
    );

    logEvent(AnalyticsEvent.CreateOnchainAllowlistForEditionsSuccess, req, {
      appendTxids,
      clearTxid,
      nftId,
    });
    res.json({ appendTxids, clearTxid, success: true });
  } catch (err: any) {
    if (isLastRetry(req)) {
      logError(
        AnalyticsEvent.CreateOnchainAllowlistForEditionsError,
        err,
        req,
        {
          nftId,
        }
      );
    }
    res.status(500).json({ success: false });
  }
}
