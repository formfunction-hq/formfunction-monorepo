import DEFAULT_PRICE_INCREMENT_PERCENTAGE from "constants/DefaultPriceIncrementPercentage";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

function getMinAllowedPriceDifference(decimals: number) {
  return 10 ** decimals / 10;
}

/**
 * Bidders must bid at least 10% higher than the current bid (e.g., minimum 0.1 SOL price diff).
 *
 * Differences are rounded to nearest 0.1 to keep numbers clean.
 */
export default function getMinPriceDiff(
  price: number,
  decimals: number,
  tickSizeConstantInLamports: Maybe<number>
): number {
  if (tickSizeConstantInLamports != null) {
    // tickSizeConstantInLamports should not be below MIN_DIFF (it's enforced on-chain),
    // but might as well be safe here.
    return Math.max(
      tickSizeConstantInLamports,
      getMinAllowedPriceDifference(decimals)
    );
  }

  if (price <= 10 ** decimals) {
    return getMinAllowedPriceDifference(decimals);
  }

  // 1. Calculate 10%
  const tenPercent = price / DEFAULT_PRICE_INCREMENT_PERCENTAGE;

  // 2. Round down to nearest .1
  const rounded = Math.floor(tenPercent / 10 ** (decimals - 1));

  // 3. Convert back to full decimals
  return rounded * 10 ** (decimals - 1);
}
