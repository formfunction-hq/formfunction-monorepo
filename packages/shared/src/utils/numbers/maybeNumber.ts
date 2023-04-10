import { Maybe, MaybeUndef } from "types/UtilityTypes";
import isNumber from "utils/numbers/isNumber";

export default function maybeNumber(val: MaybeUndef<string>): Maybe<number> {
  return val == null || !isNumber(val) ? null : Number(val);
}
