import LocalStoragePrefix from "types/enums/LocalStoragePrefix";

export default function removeWithPrefix(
  prefix: LocalStoragePrefix,
  key: string
) {
  localStorage.removeItem(`${prefix}-${key}`);
}
