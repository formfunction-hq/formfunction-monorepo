import groupBy from "formfn-shared/dist/utils/array/groupBy";
import objectEntries from "formfn-shared/dist/utils/object/objectEntries";
import NftAttributes from "src/types/NftAttributes";

/**
 * This implements step #1 of Moonrank's rarity algorithm: https://moonrank.app/faq
 */
export default function getAttributesMaxShape(
  allNftAttributes: ReadonlyArray<NftAttributes>
) {
  const maxShape: Record<string, number> = {};

  allNftAttributes.forEach((attributes) => {
    const attributesGrouped = groupBy(
      attributes,
      (attribute) => attribute.trait_type
    );
    objectEntries(attributesGrouped).forEach((entry) => {
      const traitType = entry[0];
      const numTraits = entry[1].length;
      maxShape[traitType] = Math.max(numTraits, maxShape[traitType] ?? 0);
    });
  });

  return maxShape;
}
