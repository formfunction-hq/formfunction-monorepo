import { GraphQLID, GraphQLInputObjectType } from "graphql";
import AssetInputGqlType from "src/schema/input/AssetInputGqlType";
import { CAMPAIGN_BASIC_INFO_INPUT_FIELDS } from "src/schema/input/campaigns/CreateCampaignInputGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const UpdateCampaignBasicInfoInputGqlType = new GraphQLInputObjectType({
  fields: {
    ...CAMPAIGN_BASIC_INFO_INPUT_FIELDS,
    campaignId: { type: gqlNonNull(GraphQLID) },
    previewAsset: { type: AssetInputGqlType },
  },
  name: Typename.UpdateCampaignBasicInfoInput,
});

export default UpdateCampaignBasicInfoInputGqlType;
