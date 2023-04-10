import LocalStoragePrefix from "types/enums/LocalStoragePrefix";

export default function setWithPrefix(
  prefix: LocalStoragePrefix,
  key: string,
  value: string
) {
  localStorage.setItem(`${prefix}-${key}`, value);
}
