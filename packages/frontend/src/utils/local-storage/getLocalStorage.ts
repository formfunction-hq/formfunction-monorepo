import LocalStorageKey from "types/enums/LocalStorageKey";

export default function getLocalStorage(key: LocalStorageKey) {
  return localStorage.getItem(key);
}
