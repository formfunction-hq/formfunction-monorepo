import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import { LDFlagValue } from "launchdarkly-node-server-sdk";
import ldClient from "src/utils/launch-darkly/ldClient";
import ldBackendUser from "src/utils/launch-darkly/ldBackendUser";

export default async function getLdFlag<T>(
  flag: LaunchDarklyFlag,
  defaultValue: T,
  user = ldBackendUser,
  callback?: (err: any, res: LDFlagValue) => void
): Promise<T> {
  return ldClient.variation(flag, user, defaultValue, callback);
}
