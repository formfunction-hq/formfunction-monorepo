import { GraphQLUnionType } from "graphql";
import CampaignFundingTierStandardGqlType from "src/schema/object/campaigns/CampaignFundingTierStandardGqlType";
import Typename from "src/types/enums/Typename";

const CampaignFundingTierGqlType = new GraphQLUnionType({
  name: Typename.CampaignFundingTier,
  types: [CampaignFundingTierStandardGqlType],
});

export default CampaignFundingTierGqlType;
