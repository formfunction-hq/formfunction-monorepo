import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import calculateAttributeMoonrankRarities from "src/utils/generative-mints/rarity/calculateAttributeMoonrankRarities";
import arrayLast from "formfn-shared/dist/utils/array/arrayLast";
import NftAttributes from "src/types/NftAttributes";
import NftAttributeWithRarity from "src/types/NftAttributeWithRarity";
import RarityInfo from "src/types/generative-mints/rarity/RarityInfo";

/**
 * This implements step #4 (the last step) of Moonrank's rarity algorithm: https://moonrank.app/faq
 */
export default function rankAttributesByMoonrankRarity<
  T extends {
    attributes: NftAttributes;
  }
>(configLines: Array<T>): Array<T & RarityInfo> {
  const allNftAttributes = configLines.map(({ attributes }) => attributes);
  const allNftAttributesWithRarityInfo =
    calculateAttributeMoonrankRarities(allNftAttributes);

  const resultsWithoutRanking = configLines.map((configLine, index) => ({
    ...configLine,
    attributesWithRarity: allNftAttributesWithRarityInfo[index].attributes,
    nftRarityPercentage:
      allNftAttributesWithRarityInfo[index].nftRarityPercentage,
  }));

  const resultsWithoutRankingSorted = resultsWithoutRanking.sort(
    getCompareByProperty("nftRarityPercentage")
  );

  return resultsWithoutRankingSorted.reduce(
    (
      acc: Array<
        T & {
          attributesWithRarity: Array<NftAttributeWithRarity>;
          nftRarityPercentage: number;
          nftRarityRanking: number;
        }
      >,
      currVal,
      index
    ) => {
      const prevDoc = arrayLast(acc);
      const nftRarityRanking =
        prevDoc == null
          ? 0
          : prevDoc.nftRarityPercentage === currVal.nftRarityPercentage
          ? prevDoc.nftRarityRanking
          : index;
      return [
        ...acc,
        {
          ...currVal,
          nftRarityRanking,
        },
      ];
    },
    []
  );
}
