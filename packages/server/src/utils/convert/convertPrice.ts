import { Currency } from "@prisma/client";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import Typename from "src/types/enums/Typename";
import convertCurrency from "src/utils/convert/convertCurrency";
import { Price } from "src/__generated__/generated";

export default function convertPrice(
  price: MaybeUndef<number>,
  currency: MaybeUndef<Currency>
): Maybe<Price> {
  return price != null && currency != null
    ? {
        __typename: Typename.Price,
        amount: price,
        currencyInfo: convertCurrency(currency),
      }
    : null;
}
