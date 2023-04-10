import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useFlagsTyped from "hooks/useFlagsTyped";
import Network from "types/enums/Network";
import getSolanaNetwork from "utils/env/getSolanaNetwork";

export default function useRpcRetryUrls(): Maybe<Array<string>> {
  const { mainnetRpcRetryUrlsFrontend } = useFlagsTyped();

  // No need to do this for devnet/testnet
  return getSolanaNetwork() === Network.Mainnet
    ? mainnetRpcRetryUrlsFrontend
    : null;
}
