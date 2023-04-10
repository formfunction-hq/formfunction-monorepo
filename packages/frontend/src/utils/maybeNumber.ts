import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default function maybeNumber(str: Maybe<string>): Maybe<number> {
  return str == null ? null : Number(str);
}
