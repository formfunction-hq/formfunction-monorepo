import { MAXIMUM_NFT_ATTRIBUTES_LENGTH } from "constants/NftAttributesValidationConstants";

export default function isValidTraitValue(traitValue: string): boolean {
  // For now, allow any characters, and just limit the length
  return (
    traitValue !== "" && traitValue.length <= MAXIMUM_NFT_ATTRIBUTES_LENGTH
  );
}
