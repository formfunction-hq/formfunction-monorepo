import NftAttributeWithRarity from "src/types/NftAttributeWithRarity";

type RarityInfo = {
  attributesWithRarity: Array<NftAttributeWithRarity>;
  nftRarityPercentage: number;
  // 0-indexed
  nftRarityRanking: number;
};

export default RarityInfo;
