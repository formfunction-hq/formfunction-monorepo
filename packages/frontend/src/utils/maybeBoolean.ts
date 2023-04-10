import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default function maybeBoolean(val: any): Maybe<boolean> {
  if (val == null) {
    return null;
  }

  if (val === "false") {
    return false;
  }

  return Boolean(val);
}
