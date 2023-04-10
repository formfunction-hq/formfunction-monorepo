import { GraphQLObjectType } from "graphql";
import CampaignFundingTierGqlType from "src/schema/union/CampaignFundingTierGqlType";
import Typename from "src/types/enums/Typename";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";

const CampaignFundingTiersForSlugResponseGqlType = new GraphQLObjectType({
  fields: {
    campaignFundingTiers: {
      type: gqlListOfNonNull(CampaignFundingTierGqlType),
    },
  },
  name: Typename.CampaignFundingTiersForSlugResponse,
});

export default CampaignFundingTiersForSlugResponseGqlType;
