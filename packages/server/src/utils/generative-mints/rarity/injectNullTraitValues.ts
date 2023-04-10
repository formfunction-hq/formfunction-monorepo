import deepCopySerializable from "formfn-shared/dist/utils/deepCopySerializable";
import { range } from "formfn-shared/dist/utils/range";
import NftAttributes from "src/types/NftAttributes";

/**
 * This implements step #2 of Moonrank's rarity algorithm: https://moonrank.app/faq
 */
export default function injectNullTraitValues(
  allNftAttributes: ReadonlyArray<NftAttributes>,
  maxShape: Record<string, number>
) {
  const attributesWithNullTraitValues = deepCopySerializable(allNftAttributes);

  attributesWithNullTraitValues.forEach((attributes) => {
    Object.entries(maxShape).forEach((maxShapeEntry) => {
      const traitType = maxShapeEntry[0];
      const traitCount = maxShapeEntry[1];
      const nftTraitCount = attributes.filter(
        (attribute) => attribute.trait_type === traitType
      ).length;
      const countDiff = traitCount - nftTraitCount;
      range(countDiff).forEach((_) => {
        attributes.push({ trait_type: traitType, value: "null" });
      });
    });
  });

  return attributesWithNullTraitValues;
}
