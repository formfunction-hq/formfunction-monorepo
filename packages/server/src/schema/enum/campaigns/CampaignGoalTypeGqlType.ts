import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

// Keep in sync with CampaignGoalType DB enum
//
// Keep in sync with CampaignGoalGqlType as well
const CampaignGoalTypeGqlType = new GraphQLEnumType({
  name: Typename.CampaignGoalType,
  values: {
    Monetary: {},
    SaleCount: {},
  },
});

export default CampaignGoalTypeGqlType;
