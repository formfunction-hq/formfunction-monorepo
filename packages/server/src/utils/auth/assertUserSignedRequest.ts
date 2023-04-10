import { PublicKey } from "@solana/web3.js";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import MyContext from "src/types/MyContext";
import logEvent from "src/utils/analytics/logEvent";

/**
 * Will throw if the request signature does not match the public key,
 * otherwise returns the public key for the user who signed the request.
 */
export default function assertUserSignedRequest(
  context: MyContext,
  errorMessageOverride?: string
): PublicKey {
  const { verifiedPublicKey } = context;

  if (verifiedPublicKey == null) {
    logEvent(AnalyticsEvent.InvalidRequestPublicKeySignature, context.req);
    throw new Error(
      errorMessageOverride ?? "Invalid request public key signature."
    );
  }

  return verifiedPublicKey;
}
