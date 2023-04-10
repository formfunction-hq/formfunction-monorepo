import { MAXIMUM_NFT_ATTRIBUTES_LENGTH } from "constants/NftAttributesValidationConstants";

export default function isValidTraitType(traitType: string): boolean {
  // For now, allow any characters, and just limit the length
  return traitType !== "" && traitType.length <= MAXIMUM_NFT_ATTRIBUTES_LENGTH;
}
