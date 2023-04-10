import { PublicKey, Transaction } from "@solana/web3.js";
import { Request } from "express";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import logEvent from "src/utils/analytics/logEvent";
import nacl from "tweetnacl";
import util from "util";
import SIGN_AUTH_MESSAGE from "formfn-shared/dist/constants/SignAuthMessage";
import { MEMO_PROGRAM_ID } from "formfn-shared/dist/constants/SolanaConstants";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";
import LRUCache from "lru-cache";

const CACHE = new LRUCache({
  max: 2000,
});

// For non-ledgers
function verifySignMessageSignature(
  publicKey: PublicKey,
  signature: string
): { error?: Error; result: boolean } {
  const encodedMessage = new util.TextEncoder().encode(SIGN_AUTH_MESSAGE);
  try {
    const result = nacl.sign.detached.verify(
      encodedMessage,
      Uint8Array.from(Buffer.from(signature, "hex")),
      publicKey.toBytes()
    );
    return { result };
  } catch (e) {
    return { error: e as Error, result: false };
  }
}

// For ledgers
function verifyMemoTransaction(
  publicKey: PublicKey,
  signature: string
): { error?: Error; result: boolean } {
  try {
    const tx = Transaction.from(Buffer.from(signature, "hex"));
    if (tx.instructions.length !== 1) {
      return { result: false };
    }
    const ix = tx.instructions[0];
    const userSignatureInTx =
      tx.signatures.find((sig) =>
        arePublicKeysEqual(sig.publicKey, publicKey)
      ) != null;

    return {
      result:
        arePublicKeysEqual(ix.programId, MEMO_PROGRAM_ID) &&
        ix.data.toString() === SIGN_AUTH_MESSAGE &&
        tx.verifySignatures() &&
        userSignatureInTx,
    };
  } catch (e) {
    return { error: e as Error, result: false };
  }
}

export default function verifySignature(
  req: Request, // This is provided for logging only.
  publicKey: Maybe<PublicKey>,
  signature: Maybe<string>
): boolean {
  if (publicKey != null && signature != null) {
    const cacheKey = `${publicKey.toString()}-${signature}`;
    const cacheResult = CACHE.get(cacheKey);
    if (cacheResult != null) {
      return cacheResult as boolean;
    }

    const verifySignMessageSignatureResult = verifySignMessageSignature(
      publicKey,
      signature
    );
    const verifyMemoTransactionResult = verifySignMessageSignatureResult.result
      ? // If the signature has already been verified, no need to call verifyMemoTransaction
        null
      : verifyMemoTransaction(publicKey, signature);
    const verified =
      verifySignMessageSignatureResult.result ||
      verifyMemoTransactionResult?.result === true;
    if (!verified) {
      logError(
        AnalyticsEvent.VerificationError,
        `Public key ${publicKey.toString()} and signature ${signature} failed to verify`,
        req,
        {
          publicKey: publicKey.toString(),
          signature,
          signatureLength: signature?.length,
          verified,
          verifyMemoTransactionError: verifyMemoTransactionResult?.error,
          verifySignMessageSignatureError:
            verifySignMessageSignatureResult.error,
        }
      );
    }

    CACHE.set(cacheKey, verified);

    return verified;
  }

  if (publicKey != null && signature == null) {
    logEvent(AnalyticsEvent.VerificationMissingSignature, req, {
      publicKey: publicKey.toString(),
      signature,
    });
  }

  return false;
}
