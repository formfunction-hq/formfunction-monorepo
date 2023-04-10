import { VersionedTransaction } from "@solana/web3.js";
import { NextFunction, Request, Response } from "express";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getUserFromRequestHeaders from "src/utils/auth/getUserFromRequestHeaders";
import getAntiBotAuthorityKeypair from "src/utils/keypairs/getAntiBotAuthorityKeypair";

export default async function signVersionedTransactionWithAntiBotAuthority(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  try {
    const user = await getUserFromRequestHeaders(req);
    if (user == null) {
      throw new Error("Invalid request.");
    }

    const tx = VersionedTransaction.deserialize(Uint8Array.from(req.body.tx));

    // Note: This might throw if a stale client submits a tx with the anti-bot
    // signer account after the anti-bot protection was disabled.
    tx.sign([getAntiBotAuthorityKeypair()]);

    const verifiedPublicKey = user.id;
    const signerPubkeys = tx.message.staticAccountKeys.slice(
      0,
      tx.message.header.numRequiredSignatures
    );
    const userSignatureInTx = signerPubkeys.find((pubkey) =>
      arePublicKeysEqual(pubkey, verifiedPublicKey)
    );

    if (userSignatureInTx == null) {
      throw new Error("Transaction signature verification failed.");
    }

    res.json({ tx: Array.from(tx.serialize()) });
  } catch (err: any) {
    logError(AnalyticsEvent.AntiBotSignerFail, err, req);
    res.sendStatus(400);
  }
}
