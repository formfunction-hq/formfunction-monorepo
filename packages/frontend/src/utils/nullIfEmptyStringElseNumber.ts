import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default function nullIfEmptyStringElseNumber(
  str: string
): Maybe<number> {
  return str === "" ? null : Number(str);
}
