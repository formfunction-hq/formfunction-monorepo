import { User } from "context/UserContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { LDUser } from "launchdarkly-js-client-sdk";

/**
 * Helper for sending up custom attributes to Launch Darkly
 * for better targeting of users.
 */
export default function getCustomLdUserAttributes(
  user: User
): Maybe<LDUser["custom"]> {
  if (user == null) {
    return null;
  }

  return {
    isCreator: user.isWhitelisted,
    ...(user.isCollector != null ? { isCollector: user.isCollector } : {}),
  };
}
