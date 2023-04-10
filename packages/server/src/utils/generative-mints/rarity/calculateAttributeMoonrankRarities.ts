import NftAttributes from "src/types/NftAttributes";
import NftAttributeWithRarity from "src/types/NftAttributeWithRarity";
import calculateTraitCounts from "src/utils/generative-mints/rarity/calculateTraitCounts";

/**
 * This implements step #3 of Moonrank's rarity algorithm: https://moonrank.app/faq
 */
export default function calculateAttributeMoonrankRarities(
  allNftAttributes: ReadonlyArray<NftAttributes>
): Array<{
  attributes: Array<NftAttributeWithRarity>;
  nftRarityPercentage: number;
}> {
  const traitCounts = calculateTraitCounts(allNftAttributes);

  return allNftAttributes.map((attributes) => {
    const attributesWithRarity = attributes.map((attribute) => ({
      ...attribute,
      rarityPercentage:
        (traitCounts[attribute.trait_type][attribute.value] * 100) /
        allNftAttributes.length,
    }));

    return {
      attributes: attributesWithRarity,
      nftRarityPercentage:
        attributesWithRarity.reduce(
          (acc, currVal) => acc * (currVal.rarityPercentage / 100),
          1
        ) * 100,
    };
  });
}
