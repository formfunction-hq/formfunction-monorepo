import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { Price } from "src/__generated__/generated";

export default function arePricesEqual(
  a: MaybeUndef<Price>,
  b: MaybeUndef<Price>
) {
  return (
    (a == null && b == null) ||
    (a != null &&
      b != null &&
      a.amount === b.amount &&
      a.currencyInfo.id === b.currencyInfo.id)
  );
}
