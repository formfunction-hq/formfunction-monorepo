import { GraphQLInputObjectType } from "graphql";
import { CAMPAIGN_ABOUT_FIELDS } from "src/schema/object/campaigns/CampaignAboutGqlType";
import Typename from "src/types/enums/Typename";

const CampaignAboutInputGqlType = new GraphQLInputObjectType({
  fields: CAMPAIGN_ABOUT_FIELDS,
  name: Typename.CampaignAboutInput,
});

export default CampaignAboutInputGqlType;
