import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import getMinPriceDiff from "utils/getMinPriceDiff";

const MIN_DIFF = LAMPORTS_PER_SOL / 10;

describe("getMinPriceDiff tests", () => {
  test.each([
    [LAMPORTS_PER_SOL / 10, MIN_DIFF],
    [LAMPORTS_PER_SOL, MIN_DIFF],
    [LAMPORTS_PER_SOL * 1.4, 1.0 * 1e8],
    [LAMPORTS_PER_SOL * 1.8, 1.0 * 1e8],

    [LAMPORTS_PER_SOL * 5, 5.0 * 1e8],
    [LAMPORTS_PER_SOL * 5.4, 5.0 * 1e8],
    [LAMPORTS_PER_SOL * 5.5, 5.0 * 1e8],

    [LAMPORTS_PER_SOL * 10, LAMPORTS_PER_SOL],
    [LAMPORTS_PER_SOL * 20, 2 * LAMPORTS_PER_SOL],
  ])("getMinPriceDiff(%i) === %i", (priceInLamports, expectedDiff) => {
    const actualDiff = getMinPriceDiff(priceInLamports, 9, null);
    expect(actualDiff).toEqual(expectedDiff);
  });
});
