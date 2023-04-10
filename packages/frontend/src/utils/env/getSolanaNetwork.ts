import Network from "types/enums/Network";
import isDevSubdomain from "utils/isDevSubdomain";
import isTestnetSubdomain from "utils/isTestnetSubdomain";

export default function getSolanaNetwork(): Network {
  if (isDevSubdomain()) {
    return Network.Devnet;
  }

  if (isTestnetSubdomain()) {
    return Network.Testnet;
  }

  return process.env.REACT_APP_SOLANA_NETWORK as Network;
}
