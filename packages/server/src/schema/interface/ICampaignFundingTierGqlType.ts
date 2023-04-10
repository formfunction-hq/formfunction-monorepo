import { GraphQLID, GraphQLInterfaceType, GraphQLString } from "graphql";
import CampaignBenefitGqlType from "src/schema/object/campaigns/CampaignBenefitGqlType";
import Typename from "src/types/enums/Typename";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

export const ICAMPAIGN_FUNDING_TIER_FIELDS = {
  benefits: { type: gqlListOfNonNull(CampaignBenefitGqlType) },
  description: { type: gqlNonNull(GraphQLString) },
  id: { type: gqlNonNull(GraphQLID) },
  title: { type: gqlNonNull(GraphQLString) },
};

const ICampaignFundingTierGqlType = new GraphQLInterfaceType({
  fields: ICAMPAIGN_FUNDING_TIER_FIELDS,
  name: Typename.ICampaignFundingTier,
});

export default ICampaignFundingTierGqlType;
