import getAttributesMaxShape from "src/utils/generative-mints/rarity/getAttributesMaxShape";
import injectNullTraitValues from "src/utils/generative-mints/rarity/injectNullTraitValues";
import GENERATIVE_MINT_CONFIG_LINES_8PXL from "src/__tests__/constants/GenerativeMintConfigLines8pxl";

describe("injectNullTraitValues tests", () => {
  it("8pxl apes test", async () => {
    const allNftAttributes = GENERATIVE_MINT_CONFIG_LINES_8PXL.map(
      ({ attributes }) => attributes
    );
    const maxShape = getAttributesMaxShape(allNftAttributes);
    const allNftAttributesWithNullTraitValues = injectNullTraitValues(
      allNftAttributes,
      maxShape
    );
    // For this collection, there are no injections
    expect(allNftAttributesWithNullTraitValues).toEqual(allNftAttributes);
  });

  it("8pxl apes test with null trait values", async () => {
    const allNftAttributes = GENERATIVE_MINT_CONFIG_LINES_8PXL.map(
      ({ attributes }) => attributes
    );
    // In order to test injections, we can manually modify maxShape
    const maxShape = { ...getAttributesMaxShape(allNftAttributes), test: 2 };
    const allNftAttributesWithNullTraitValues = injectNullTraitValues(
      allNftAttributes,
      maxShape
    );

    expect(allNftAttributesWithNullTraitValues[0]).toEqual([
      ...allNftAttributes[0],
      { trait_type: "test", value: "null" },
      { trait_type: "test", value: "null" },
    ]);
  });
});
