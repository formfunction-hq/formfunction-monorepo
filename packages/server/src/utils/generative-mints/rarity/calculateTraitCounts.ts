import NftAttributes from "src/types/NftAttributes";

/**
 * This implements part of step #3 of Moonrank's rarity algorithm: https://moonrank.app/faq
 */
export default function calculateTraitCounts(
  allNftAttributes: ReadonlyArray<NftAttributes>
): {
  [traitType: string]: {
    [traitValue: string]: number;
  };
} {
  const traitCounts: {
    [traitType: string]: {
      [traitValue: string]: number;
    };
  } = {};

  allNftAttributes.forEach((attributes) => {
    attributes.forEach((attribute) => {
      const { trait_type: traitType, value } = attribute;
      if (traitCounts[traitType] == null) {
        traitCounts[traitType] = {};
      }
      if (traitCounts[traitType][value] == null) {
        traitCounts[traitType][value] = 0;
      }

      traitCounts[attribute.trait_type][value] += 1;
    });
  });

  return traitCounts;
}
