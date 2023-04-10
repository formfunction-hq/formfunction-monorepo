import { PublicKey } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import toObject from "formfn-shared/dist/utils/toObject";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import logEvent from "src/utils/analytics/logEvent";
import getNftMintOwner from "src/utils/solana/getNftMintOwner";
import parseAndInsertTransaction from "src/utils/transaction/parseAndInsertTransaction";

export default async function insertTransactionEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  try {
    const { mintAddress: mint, status, txId: txid } = req.body;

    if (status !== "success") {
      logError(
        AnalyticsEvent.CrossmintError,
        `Crossmint status is ${status}, expected success`,
        req,
        req.body
      );
      res.sendStatus(500);
      return;
    }

    const owner = await getNftMintOwner(new PublicKey(mint));
    const createdTx = await parseAndInsertTransaction({
      isCrossmint: true,
      mint,
      overrides: {
        // We override toUserId because Crossmint buys the NFT with their treasury wallet,
        // and then transfers it to the user's Crossmint wallet. Since the final destination
        // of the NFT is the latter, we prefer to use that.
        toUserId: owner?.toString(),
      },
      req,
      txid,
    });
    logEvent(AnalyticsEvent.CrossmintSuccess, req, {
      createdTx: toObject(createdTx),
    });

    res.json({
      createdTx: toObject(createdTx),
    });
  } catch (e) {
    logError(AnalyticsEvent.CrossmintError, e as Error, req, req.body);
    res.sendStatus(500);
  }
}
