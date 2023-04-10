import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import Network from "src/types/enums/Network";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";

const FLAGS = {
  [Network.Devnet]: LaunchDarklyFlag.DevnetRpcRetryUrls,
  [Network.Mainnet]: LaunchDarklyFlag.MainnetRpcRetryUrls,
  // TODO: use testnet specific urls when needed
  [Network.Testnet]: LaunchDarklyFlag.DevnetRpcRetryUrls,
};

export default function getRpcRetryUrls(
  networkOverride?: Network
): Promise<Array<string>> {
  const network = networkOverride ?? (process.env.SOLANA_NETWORK as Network);
  return getLdFlag<Array<string>>(FLAGS[network], []);
}
