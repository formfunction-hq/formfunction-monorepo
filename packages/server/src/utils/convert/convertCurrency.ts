import { Currency } from "@prisma/client";
import Typename from "src/types/enums/Typename";
import {
  CurrencyExpress,
  CurrencyNameExpress_Enum,
} from "src/__generated__/generated";

export default function convertCurrency(currency: Currency): CurrencyExpress {
  return {
    __typename: Typename.Currency,
    decimals: currency.decimals,
    iconSrc: currency.iconSrc,
    id: currency.id,
    mint: currency.mint,
    name: currency.name as CurrencyNameExpress_Enum,
    shortSymbol: currency.shortSymbol,
    symbol: currency.symbol,
  };
}
