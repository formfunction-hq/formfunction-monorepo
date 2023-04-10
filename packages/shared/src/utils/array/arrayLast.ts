import { Maybe } from "types/UtilityTypes";

export default function arrayLast<T>(arr: ReadonlyArray<T>): Maybe<T> {
  if (arr.length === 0) {
    return null;
  }

  return arr[arr.length - 1];
}
