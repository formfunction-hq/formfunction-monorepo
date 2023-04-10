import { WalletType } from "components/modal/ConnectWalletModal";
import PublicKeyOrString from "formfn-shared/dist/types/PublicKeyOrString";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import LocalStoragePrefix from "types/enums/LocalStoragePrefix";
import getWithPrefix from "utils/local-storage/getWithPrefix";

export default function getIsColdWallet(
  publicKey: PublicKeyOrString
): Maybe<boolean> {
  const walletType = getWithPrefix(
    LocalStoragePrefix.WalletType,
    publicKey.toString()
  );
  if (walletType == null) {
    return null;
  }
  return walletType === WalletType.ColdWallet;
}
