import Currency from "types/relay/Currency";
import isNativeCurrency from "utils/currency/isNativeCurrency";

export default function canSelectedCurrencyBeUsed(
  currency: Currency,
  numCreators: number
) {
  return isNativeCurrency(currency) || numCreators === 1;
}
