import LocalStoragePrefix from "types/enums/LocalStoragePrefix";
import getWithPrefix from "utils/local-storage/getWithPrefix";

export default function getSignature(address: string) {
  return getWithPrefix(LocalStoragePrefix.Signature, address);
}
