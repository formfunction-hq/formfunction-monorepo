import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";

type PromiseLimitsObject = {
  areNftsSynced: number;
  syncOnchainTxs: number;
};

const DEFAULT: PromiseLimitsObject = {
  areNftsSynced: 20,
  syncOnchainTxs: 20,
};

export default async function getPromiseLimit(str: keyof PromiseLimitsObject) {
  const promiseLimits = await getLdFlag<PromiseLimitsObject>(
    LaunchDarklyFlag.PromiseLimits,
    DEFAULT
  );

  return promiseLimits[str];
}
