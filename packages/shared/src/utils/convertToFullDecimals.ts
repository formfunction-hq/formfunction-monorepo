import BigNumber from "bignumber.js";

/**
 * e.g.,
 *   convertToFullDecimals(2.19, 9) -> 2,190,000,000
 *   convertToFullDecimals(0.136, 6) -> 136,000
 */
export default function convertToFullDecimals(
  amount: string | number,
  decimals: number
): number {
  const result = new BigNumber(amount)
    .multipliedBy(10 ** decimals)
    // BigInt, which is used in SPL libraries, expects an integer value
    .decimalPlaces(0)
    .toNumber();
  if (Number.isNaN(result)) {
    return 0;
  }
  return result;
}
