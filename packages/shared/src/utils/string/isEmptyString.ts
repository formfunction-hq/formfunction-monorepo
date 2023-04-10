import { MaybeUndef } from "types/UtilityTypes";

export default function isEmptyString(str: MaybeUndef<string>) {
  return str == null || str === "";
}
