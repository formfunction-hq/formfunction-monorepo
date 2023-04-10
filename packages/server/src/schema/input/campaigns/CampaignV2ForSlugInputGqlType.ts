import { GraphQLInputObjectType } from "graphql";
import { CAMPAIGN_FOR_SLUG_INPUT_FIELDS } from "src/schema/input/campaigns/CampaignForSlugInputGqlType";
import Typename from "src/types/enums/Typename";

const CampaignV2ForSlugInputGqlType = new GraphQLInputObjectType({
  fields: CAMPAIGN_FOR_SLUG_INPUT_FIELDS,
  name: Typename.CampaignV2ForSlugInput,
});

export default CampaignV2ForSlugInputGqlType;
