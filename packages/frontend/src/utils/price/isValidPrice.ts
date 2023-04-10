import MaxDecimals from "types/enums/MaxDecimals";
import isNonNegativeNumber from "utils/isNonNegativeNumber";
import isPositiveNumber from "utils/isPositiveNumber";

const MAX_PRICE = 1e17; // Arbitrarily 100M SOL

export default function isValidPrice(
  price: string,
  decimals: number,
  maxDecimals = MaxDecimals.Price,
  allowZero = false
) {
  const validationFn = allowZero ? isNonNegativeNumber : isPositiveNumber;
  if (!validationFn(price)) {
    return false;
  }

  const splits = price.split(".");
  if (splits.length > 1 && splits[1].length > maxDecimals) {
    return false;
  }

  return 10 ** decimals * Number(price) <= MAX_PRICE;
}
