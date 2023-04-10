import { PublicKey } from "@solana/web3.js";
import { Request } from "express";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import verifySignature from "src/utils/auth/verifySignature";
import getPublicKey from "src/utils/headers/getPublicKey";
import getPublicKeySignature from "src/utils/headers/getPublicKeySignature";

/**
 * Request headers include public key and signature fields. If the provided
 * signature matches the public key this will return the PublicKey. For any
 * otherwise invalid combinations, it will return null.
 */
export default function getVerifiedPublicKey(
  req: MaybeUndef<Request>
): Maybe<PublicKey> {
  if (req == null) {
    return null;
  }

  const publicKey = getPublicKey(req);
  const signature = getPublicKeySignature(req);
  const verified = verifySignature(req, publicKey, signature);
  return verified && publicKey != null ? publicKey : null;
}
