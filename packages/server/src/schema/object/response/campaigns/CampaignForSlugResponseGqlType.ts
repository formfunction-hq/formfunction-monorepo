import { GraphQLObjectType } from "graphql";
import CampaignGqlType from "src/schema/object/campaigns/CampaignGqlType";
import Typename from "src/types/enums/Typename";

const CampaignForSlugResponseGqlType = new GraphQLObjectType({
  fields: {
    campaign: { type: CampaignGqlType },
  },
  name: Typename.CampaignForSlugResponse,
});

export default CampaignForSlugResponseGqlType;
