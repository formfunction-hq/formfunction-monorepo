import convertSolToLamports from "utils/convertSolToLamports";

describe("convertSolToLamports tests", () => {
  test.each([
    ["2.01", 2010000000],
    [(1e6).toString(), 1e15],
    [(999999.99).toString(), 99999999e7],
  ])("convertSolToLamports(%i) === %i", (priceInSol, expected) => {
    const actual = convertSolToLamports(priceInSol);
    expect(actual).toEqual(expected);
  });
});
