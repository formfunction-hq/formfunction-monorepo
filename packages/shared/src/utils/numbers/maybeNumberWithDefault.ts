import { MaybeUndef } from "types/UtilityTypes";

export default function maybeNumberWithDefault(
  val: MaybeUndef<string>,
  defaultVal: number
): number {
  return val != null ? Number(val) : defaultVal;
}
