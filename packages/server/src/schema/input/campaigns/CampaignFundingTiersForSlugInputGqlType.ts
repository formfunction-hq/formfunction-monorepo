import { GraphQLInputObjectType } from "graphql";
import { CAMPAIGN_FOR_SLUG_INPUT_FIELDS } from "src/schema/input/campaigns/CampaignForSlugInputGqlType";
import Typename from "src/types/enums/Typename";

const CampaignFundingTiersForSlugInputGqlType = new GraphQLInputObjectType({
  fields: CAMPAIGN_FOR_SLUG_INPUT_FIELDS,
  name: Typename.CampaignFundingTiersForSlugInput,
});

export default CampaignFundingTiersForSlugInputGqlType;
