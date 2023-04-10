import { Maybe } from "types/UtilityTypes";

export default function maybeString(val: any): Maybe<string> {
  return val != null ? String(val) : null;
}
