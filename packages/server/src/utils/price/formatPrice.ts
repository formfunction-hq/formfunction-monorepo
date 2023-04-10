import { Currency } from "@prisma/client";
import formatDecimals from "formfn-shared/dist/utils/formatDecimals";
import { CurrencyExpress } from "src/__generated__/generated";

export default function formatPrice(
  priceInFullDecimals: number,
  currency: Currency | CurrencyExpress
): string {
  const amount = formatDecimals(priceInFullDecimals, currency.decimals);
  return `${amount} ${currency.shortSymbol ?? currency.symbol}`;
}
