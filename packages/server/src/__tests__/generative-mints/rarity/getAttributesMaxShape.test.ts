import NftAttributes from "src/types/NftAttributes";
import getAttributesMaxShape from "src/utils/generative-mints/rarity/getAttributesMaxShape";
import GENERATIVE_MINT_CONFIG_LINES_8PXL from "src/__tests__/constants/GenerativeMintConfigLines8pxl";

const ALL_NFT_ATTRIBUTES_CUSTOM: Array<NftAttributes> = [
  [
    {
      trait_type: "Background",
      value: "Red",
    },
    {
      trait_type: "Type",
      value: "Brown",
    },
    {
      trait_type: "Clothing",
      value: "Red",
    },
    {
      trait_type: "Clothing",
      value: "Belt",
    },
  ],
  [
    {
      trait_type: "Hat",
      value: "RedBandana",
    },
    {
      trait_type: "Item",
      value: "none",
    },
  ],
];

describe("getAttributesMaxShape tests", () => {
  it("8pxl apes test", async () => {
    const allNftAttributes = GENERATIVE_MINT_CONFIG_LINES_8PXL.map(
      ({ attributes }) => attributes
    );
    const maxShape = getAttributesMaxShape(allNftAttributes);
    expect(maxShape).toEqual({
      Background: 1,
      Clothing: 1,
      Hat: 1,
      Item: 1,
      Type: 1,
    });
  });

  it("custom test", async () => {
    const maxShape = getAttributesMaxShape(ALL_NFT_ATTRIBUTES_CUSTOM);
    expect(maxShape).toEqual({
      Background: 1,
      Clothing: 2,
      Hat: 1,
      Item: 1,
      Type: 1,
    });
  });
});
