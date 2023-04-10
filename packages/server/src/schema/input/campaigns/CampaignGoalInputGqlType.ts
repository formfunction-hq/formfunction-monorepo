import { GraphQLInputObjectType, GraphQLString } from "graphql";
import CampaignGoalTypeGqlType from "src/schema/enum/campaigns/CampaignGoalTypeGqlType";
import CurrencyNameGqlType from "src/schema/enum/CurrencyNameGqlType";
import BigintScalarGqlType from "src/schema/scalar/BigintScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CampaignGoalInputGqlType = new GraphQLInputObjectType({
  fields: {
    goalAmount: { type: gqlNonNull(BigintScalarGqlType) },
    goalCurrencyName: { type: gqlNonNull(CurrencyNameGqlType) },
    goalProgressSymbol: { type: gqlNonNull(GraphQLString) },
    goalType: { type: gqlNonNull(CampaignGoalTypeGqlType) },
  },
  name: Typename.CampaignGoalInput,
});

export default CampaignGoalInputGqlType;
