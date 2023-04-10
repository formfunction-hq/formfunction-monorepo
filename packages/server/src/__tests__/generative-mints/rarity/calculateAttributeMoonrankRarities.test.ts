import calculateAttributeMoonrankRarities from "src/utils/generative-mints/rarity/calculateAttributeMoonrankRarities";
import GENERATIVE_MINT_CONFIG_LINES_8PXL from "src/__tests__/constants/GenerativeMintConfigLines8pxl";

describe("calculateAttributeMoonrankRarities tests", () => {
  it("8pxl apes test", async () => {
    const allNftAttributes = GENERATIVE_MINT_CONFIG_LINES_8PXL.map(
      ({ attributes }) => attributes
    );
    const result = calculateAttributeMoonrankRarities(allNftAttributes);

    // Spot check against Moonrank
    expect(result[0].nftRarityPercentage).toEqual(0.09510487982067792);
    expect(result[1].nftRarityPercentage).toEqual(0.10585945054902095);
  });
});
