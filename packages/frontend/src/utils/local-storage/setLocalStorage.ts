import LocalStorageKey from "types/enums/LocalStorageKey";

export default function setLocalStorage(key: LocalStorageKey, value: string) {
  localStorage.setItem(key, value);
}
