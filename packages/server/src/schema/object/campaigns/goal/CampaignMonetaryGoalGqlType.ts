import { GraphQLObjectType } from "graphql";
import ICampaignGoalGqlType, {
  ICAMPAIGN_GOAL_FIELDS,
} from "src/schema/interface/ICampaignGoalGqlType";
import CurrencyGqlType from "src/schema/object/CurrencyGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CampaignMonetaryGoalGqlType = new GraphQLObjectType({
  fields: {
    ...ICAMPAIGN_GOAL_FIELDS,
    currency: {
      type: gqlNonNull(CurrencyGqlType),
    },
  },
  interfaces: [ICampaignGoalGqlType],
  name: Typename.CampaignMonetaryGoal,
});

export default CampaignMonetaryGoalGqlType;
