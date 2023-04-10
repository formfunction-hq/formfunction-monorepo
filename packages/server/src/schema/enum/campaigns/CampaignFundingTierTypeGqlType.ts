import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

// Keep in sync with CampaignFundingTierType DB enum
const CampaignFundingTierTypeGqlType = new GraphQLEnumType({
  name: Typename.CampaignFundingTierType,
  values: {
    Gacha: {},
    Standard: {},
  },
});

export default CampaignFundingTierTypeGqlType;
