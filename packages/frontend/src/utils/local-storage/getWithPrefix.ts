import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import LocalStoragePrefix from "types/enums/LocalStoragePrefix";

export default function getWithPrefix(
  prefix: LocalStoragePrefix,
  key: string
): Maybe<string> {
  return localStorage.getItem(`${prefix}-${key}`);
}
