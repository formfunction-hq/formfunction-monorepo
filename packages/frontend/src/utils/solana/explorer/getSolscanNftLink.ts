import Network from "types/enums/Network";
import getSolanaNetwork from "utils/env/getSolanaNetwork";

export default function getSolscanNftLink(mint: string) {
  return `https://solscan.io/token/${mint}${
    // For some reason, the cluster url param doesn't work with mainnet-beta
    getSolanaNetwork() === Network.Mainnet
      ? ""
      : `?cluster=${getSolanaNetwork()}`
  }`;
}
