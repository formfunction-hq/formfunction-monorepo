import Bundlr from "@bundlr-network/client";
import Network from "src/types/enums/Network";
import getBundlrNodeUrl from "src/utils/arweave/bundlr/getBundlrNodeUrl";
import getRpcHostFromNetwork from "src/utils/solana/getRpcHostFromNetwork";

export default async function getBundlrClient(bundlrNodeUrlOverride?: string) {
  const bundlrNodeUrl =
    bundlrNodeUrlOverride != null && bundlrNodeUrlOverride !== ""
      ? bundlrNodeUrlOverride
      : await getBundlrNodeUrl();
  // Bundlr always uses mainnet
  const providerUrl = getRpcHostFromNetwork(Network.Mainnet);
  return new Bundlr(bundlrNodeUrl, "solana", process.env.SOLANA_KEY, {
    providerUrl,
  });
}
