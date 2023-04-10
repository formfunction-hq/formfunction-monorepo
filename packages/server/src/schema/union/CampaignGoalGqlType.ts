import { GraphQLUnionType } from "graphql";
import Typename from "src/types/enums/Typename";
import CampaignMonetaryGoalGqlType from "src/schema/object/campaigns/goal/CampaignMonetaryGoalGqlType";
import CampaignSaleCountGoalGqlType from "src/schema/object/campaigns/goal/CampaignSaleCountGoalGqlType";

// Keep in sync with CampaignGoalTypeGqlType
const CampaignGoalGqlType = new GraphQLUnionType({
  name: Typename.CampaignGoal,
  types: [CampaignMonetaryGoalGqlType, CampaignSaleCountGoalGqlType],
});

export default CampaignGoalGqlType;
