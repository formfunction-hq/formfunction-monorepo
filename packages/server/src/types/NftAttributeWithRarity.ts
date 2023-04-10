import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

// Represents a single attribute with a rarity score.
type NftAttributeWithRarity = {
  // 1 -> 1%
  rarityPercentage: number;
  trait_type: string;
  value: Maybe<string>;
};

export default NftAttributeWithRarity;
