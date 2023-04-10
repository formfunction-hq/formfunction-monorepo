import { MAXIMUM_NFT_ATTRIBUTES_COUNT } from "formfn-shared/dist/constants/NftAttributesValidationConstants";
import removeDuplicatesWithComparison from "formfn-shared/dist/utils/array/removeDuplicatesWithComparison";
import isValidTraitType from "formfn-shared/dist/utils/validation/isValidTraitType";
import isValidTraitValue from "formfn-shared/dist/utils/validation/isValidTraitValue";
import { Undef } from "formfn-shared/dist/types/UtilityTypes";
import {
  InputMaybe,
  NftMetadataV1AttributeInput,
} from "src/__generated__/generated";

/**
 * Validate NFT Attributes before Arweave upload. Will throw if any
 * attribute is invalid.
 */
export default function validateNftAttributesInput(
  attributes: Undef<InputMaybe<Array<NftMetadataV1AttributeInput>>>
) {
  if (attributes == null) {
    return;
  }

  const unique = removeDuplicatesWithComparison(
    attributes,
    (a, b) => a.trait_type === b.trait_type && a.value === b.value
  );

  if (attributes.length > unique.length) {
    throw new Error("NFT attributes must all be unique.");
  }

  if (attributes.length > MAXIMUM_NFT_ATTRIBUTES_COUNT) {
    throw new Error(
      `Too many attributes, maximum number is: ${MAXIMUM_NFT_ATTRIBUTES_COUNT}.`
    );
  }

  attributes.forEach((attribute) => {
    const { trait_type, value } = attribute;
    if (!isValidTraitType(trait_type)) {
      throw new Error("Invalid trait type");
    }
    if (!isValidTraitValue(value)) {
      throw new Error("Invalid trait value");
    }
  });
}
