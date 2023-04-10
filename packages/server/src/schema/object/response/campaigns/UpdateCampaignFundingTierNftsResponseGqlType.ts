import { GraphQLObjectType } from "graphql";
import CampaignFundingTierGqlType from "src/schema/union/CampaignFundingTierGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const UpdateCampaignFundingTierNftsResponseGqlType = new GraphQLObjectType({
  fields: {
    campaignFundingTier: { type: gqlNonNull(CampaignFundingTierGqlType) },
  },
  name: Typename.UpdateCampaignFundingTierNftsResponse,
});

export default UpdateCampaignFundingTierNftsResponseGqlType;
