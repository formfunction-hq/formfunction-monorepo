import LocalStorageKey from "types/enums/LocalStorageKey";

export default function removeLocalStorage(key: LocalStorageKey) {
  localStorage.removeItem(key);
}
