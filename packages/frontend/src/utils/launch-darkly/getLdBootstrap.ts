import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { Flags } from "hooks/useFlagsTyped";

let memoize: MaybeUndef<Flags>;

export default function getLdBootstrap() {
  if (memoize !== undefined) {
    return memoize;
  }

  try {
    const ldBootstrapElem = document.getElementById("ldbootstrap");
    memoize = JSON.parse(ldBootstrapElem?.textContent ?? "{}");
  } catch {
    memoize = null;
  }

  return memoize;
}
