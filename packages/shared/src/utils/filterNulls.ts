import { MaybeUndef } from "types/UtilityTypes";
import isNotNull from "utils/isNotNull";

export default function filterNulls<T>(arr: Array<MaybeUndef<T>>): Array<T> {
  return arr.filter(isNotNull);
}
