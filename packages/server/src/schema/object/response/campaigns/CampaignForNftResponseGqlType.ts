import { GraphQLObjectType } from "graphql";
import CampaignV2GqlType from "src/schema/object/campaigns/CampaignV2GqlType";
import CurrencyGqlType from "src/schema/object/CurrencyGqlType";
import Typename from "src/types/enums/Typename";

const CampaignForNftResponseGqlType = new GraphQLObjectType({
  fields: {
    campaign: { type: CampaignV2GqlType },
    campaignGoalCurrency: {
      description:
        "campaign may be null even if this is non-null, because exposing a campaign's goal " +
        "currency has different permissions than exposing the campaign itself. " +
        "For example, we want to restrict offer currencies when an NFT is part of a campaign, " +
        "even if the campaign is not yet published.",
      type: CurrencyGqlType,
    },
  },
  name: Typename.CampaignForNftResponse,
});

export default CampaignForNftResponseGqlType;
