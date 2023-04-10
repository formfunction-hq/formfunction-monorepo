import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import MyContext from "src/types/MyContext";
import logError from "src/utils/analytics/logError";
import getVerifiedPublicKey from "src/utils/auth/getVerifiedPublicKey";

/**
 * For queries that rely on the viewer, we typically require viewerId to be passed as
 * input (for why, see https://github.com/formfunction-hq/formfn-monorepo/pull/2680).
 *
 * However, we don't want to allow people to pretend to be someone else, and hence gain
 * access to sensitive information.
 *
 * Thus, this function ensures that the viewerId passed in input is the same as the
 * verified public key computed from the request headers.
 */
export default function getViewerId(
  context: MyContext,
  inputViewerId: MaybeUndef<string>
): Maybe<string> {
  const verifiedPublicKey = getVerifiedPublicKey(context.req);
  if (inputViewerId == null) {
    return null;
  }

  if (inputViewerId !== verifiedPublicKey?.toString()) {
    logError(
      AnalyticsEvent.ViewerIdMismatch,
      `Viewer ID mismatch, inputViewerId = ${inputViewerId}, verifiedPublicKey = ${verifiedPublicKey?.toString()}}`,
      context.req,
      {
        inputViewerId,
        verifiedPublicKey: verifiedPublicKey?.toString(),
      }
    );
    return null;
  }

  return inputViewerId;
}
