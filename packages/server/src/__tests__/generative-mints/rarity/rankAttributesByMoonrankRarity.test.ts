import rankAttributesByMoonrankRarity from "src/utils/generative-mints/rarity/rankAttributesByMoonrankRarity";
import GENERATIVE_MINT_CONFIG_LINES_8PXL from "src/__tests__/constants/GenerativeMintConfigLines8pxl";

describe("rankAttributesByMoonrankRarity tests", () => {
  it("8pxl apes test", async () => {
    const ranked = rankAttributesByMoonrankRarity(
      GENERATIVE_MINT_CONFIG_LINES_8PXL
    );

    // Spot check against Moonrank
    expect(ranked[0].name).toEqual("8PXL APES #132");
    expect(ranked[0].nftRarityRanking).toEqual(0);

    expect(ranked[1].name).toEqual("8PXL APES #227");
    expect(ranked[1].nftRarityRanking).toEqual(0);

    expect(ranked[2].name).toEqual("8PXL APES #245");
    expect(ranked[2].nftRarityRanking).toEqual(2);
  });
});
