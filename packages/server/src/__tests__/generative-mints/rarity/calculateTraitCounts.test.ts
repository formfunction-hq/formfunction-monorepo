import calculateTraitCounts from "src/utils/generative-mints/rarity/calculateTraitCounts";
import GENERATIVE_MINT_CONFIG_LINES_8PXL from "src/__tests__/constants/GenerativeMintConfigLines8pxl";

describe("calculateTraitCounts tests", () => {
  it("8pxl apes test", async () => {
    const allNftAttributes = GENERATIVE_MINT_CONFIG_LINES_8PXL.map(
      ({ attributes }) => attributes
    );
    const traitCounts = calculateTraitCounts(allNftAttributes);

    // Spot check against Moonrank
    expect(traitCounts.Hat.RedBandana).toEqual(38);
    expect(traitCounts.Clothing.Red).toEqual(47);
    expect(traitCounts.Background.Red).toEqual(67);
    expect(traitCounts.Type.Brown).toEqual(108);
    expect(traitCounts.Item.none).toEqual(288);
  });
});
