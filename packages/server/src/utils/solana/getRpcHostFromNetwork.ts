import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import Network from "src/types/enums/Network";
import logError from "src/utils/analytics/logError";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import ldBackendUser from "src/utils/launch-darkly/ldBackendUser";

const DEFAULTS = {
  [Network.Devnet]: "REPLACEME",
  [Network.Mainnet]: "REPLACEME",
  [Network.Testnet]: "REPLACEME",
};

const FLAGS = {
  [Network.Devnet]: LaunchDarklyFlag.DevnetRpcUrl,
  [Network.Mainnet]: LaunchDarklyFlag.MainnetRpcUrl,
  [Network.Testnet]: LaunchDarklyFlag.TestnetRpcUrl,
};

const LD_VALS = DEFAULTS;

export default function getRpcHostFromNetwork(network: Network): string {
  const flag = FLAGS[network];
  const defaultRpc = DEFAULTS[network];

  getLdFlag(flag, defaultRpc, ldBackendUser, (err, val) => {
    if (err != null) {
      logError(AnalyticsEvent.LaunchDarklyError, err, null, {
        flag,
      });
      return;
    }

    LD_VALS[network] = val;
  });

  return LD_VALS[network];
}

/**
 * Syncs mainnet URL with LD value.
 */
export function syncRpcHostFromNetwork(
  network: Network,
  onChange: (url: string) => void
) {
  const flag = FLAGS[network];
  const defaultRpc = DEFAULTS[network];

  getLdFlag(flag, defaultRpc, ldBackendUser, (err, val) => {
    if (err != null) {
      logError(AnalyticsEvent.LaunchDarklyError, err, null, {
        flag,
      });
      return;
    }

    if (LD_VALS[network] !== val) {
      onChange(val);
    }
    LD_VALS[network] = val;
  });
}
