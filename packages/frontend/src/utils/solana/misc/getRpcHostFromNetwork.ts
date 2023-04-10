import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { Flags } from "hooks/useFlagsTyped";
import Network from "types/enums/Network";
import getLdBootstrap from "utils/launch-darkly/getLdBootstrap";

export default function getRpcHostFromNetwork(
  network: Network,
  flagsOverride?: Flags
): string {
  const flags = flagsOverride ?? getLdBootstrap();
  switch (network) {
    case Network.Testnet:
      return flags?.testnetRpcUrlFrontend ?? "https://api.testnet.solana.com";
    case Network.Devnet:
      return flags?.devnetRpcUrlFrontend ?? "https://api.devnet.solana.com";
    case Network.Mainnet:
      return (
        flags?.mainnetRpcUrlFrontend ?? "https://api.mainnet-beta.solana.com"
      );
    default:
      return assertUnreachable(network);
  }
}
