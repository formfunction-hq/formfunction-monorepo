import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import { NftExpress } from "src/__generated__/generated";

/**
 * The type of the source object that resolvers of NftGqlType can take as input.
 */
type NftSourceType = NftExpress & {
  _MasterEditionNft: Maybe<ConvertNftToMetadataAccountType["MasterEditionNft"]>;
  _campaignFundingTierId: Maybe<string>;
};

export default NftSourceType;
