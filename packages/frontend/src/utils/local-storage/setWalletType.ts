import { WalletType } from "components/modal/ConnectWalletModal";
import PublicKeyOrString from "formfn-shared/dist/types/PublicKeyOrString";
import LocalStoragePrefix from "types/enums/LocalStoragePrefix";
import setWithPrefix from "utils/local-storage/setWithPrefix";

export default function setWalletType(
  publicKey: PublicKeyOrString,
  val: WalletType
): void {
  setWithPrefix(LocalStoragePrefix.WalletType, publicKey.toString(), val);
}
