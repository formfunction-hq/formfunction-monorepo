import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";

export default function bigintToNumber(val: MaybeUndef<bigint | BigInt>) {
  return val == null ? null : Number(val);
}
