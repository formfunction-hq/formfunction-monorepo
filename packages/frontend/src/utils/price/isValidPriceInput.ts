import filterNulls from "formfn-shared/dist/utils/filterNulls";
import MaxDecimals from "types/enums/MaxDecimals";
import isValidPrice from "utils/price/isValidPrice";

/**
 * We need to be a bit more lax when people are typing in the price.
 */
export default function isValidPriceInput(
  price: string,
  maxDecimals = MaxDecimals.Price,
  decimals = 9
) {
  const edgeCases = filterNulls([
    "",
    "0",
    maxDecimals > 0 ? "0." : null,
    maxDecimals > 0 ? "." : null,
    maxDecimals > 1 ? "0.0" : null,
    maxDecimals > 1 ? ".0" : null,
  ]);

  return (
    edgeCases.includes(price) || isValidPrice(price, decimals, maxDecimals)
  );
}
