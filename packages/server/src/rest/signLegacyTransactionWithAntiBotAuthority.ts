import { Transaction } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getUserFromRequestHeaders from "src/utils/auth/getUserFromRequestHeaders";
import getAntiBotAuthorityKeypair from "src/utils/keypairs/getAntiBotAuthorityKeypair";

export default async function signLegacyTransactionWithAntiBotAuthority(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  try {
    const user = await getUserFromRequestHeaders(req);
    if (user == null) {
      throw new Error("Invalid request.");
    }

    const tx = Transaction.from(req.body.tx.data);

    // Note: This might throw if a stale client submits a tx with the anti-bot
    // signer account after the anti-bot protection was disabled.
    tx.partialSign(getAntiBotAuthorityKeypair());

    const verifiedPublicKey = user.id;
    const userSignatureInTx = tx.signatures.find((sig) =>
      arePublicKeysEqual(sig.publicKey, verifiedPublicKey)
    );

    if (userSignatureInTx == null || tx.verifySignatures() === false) {
      throw new Error("Transaction signature verification failed.");
    }

    res.json({ tx: tx.serialize() });
  } catch (err: any) {
    logError(AnalyticsEvent.AntiBotSignerFail, err, req);
    res.sendStatus(400);
  }
}
