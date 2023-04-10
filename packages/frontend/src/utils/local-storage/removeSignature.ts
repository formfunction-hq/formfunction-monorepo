import PublicKeyOrString from "formfn-shared/dist/types/PublicKeyOrString";
import LocalStoragePrefix from "types/enums/LocalStoragePrefix";
import removeWithPrefix from "utils/local-storage/removeWithPrefix";

export default function removeSignature(publicKey: PublicKeyOrString): void {
  removeWithPrefix(LocalStoragePrefix.Signature, publicKey.toString());
}
