import { GraphQLInterfaceType } from "graphql";
import BigintScalarGqlType from "src/schema/scalar/BigintScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

export const ICAMPAIGN_GOAL_FIELDS = {
  currentAmount: { type: gqlNonNull(BigintScalarGqlType) },
  goalAmount: { type: gqlNonNull(BigintScalarGqlType) },
};

const ICampaignGoalGqlType = new GraphQLInterfaceType({
  fields: ICAMPAIGN_GOAL_FIELDS,
  name: Typename.ICampaignGoal,
});

export default ICampaignGoalGqlType;
