import { GraphQLObjectType } from "graphql";
import ICampaignGoalGqlType, {
  ICAMPAIGN_GOAL_FIELDS,
} from "src/schema/interface/ICampaignGoalGqlType";
import Typename from "src/types/enums/Typename";

const CampaignSaleCountGoalGqlType = new GraphQLObjectType({
  fields: {
    ...ICAMPAIGN_GOAL_FIELDS,
  },
  interfaces: [ICampaignGoalGqlType],
  name: Typename.CampaignSaleCountGoal,
});

export default CampaignSaleCountGoalGqlType;
