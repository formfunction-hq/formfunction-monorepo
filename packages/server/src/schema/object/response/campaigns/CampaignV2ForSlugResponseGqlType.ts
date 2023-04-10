import { GraphQLObjectType } from "graphql";
import CampaignV2GqlType from "src/schema/object/campaigns/CampaignV2GqlType";
import Typename from "src/types/enums/Typename";

const CampaignV2ForSlugResponseGqlType = new GraphQLObjectType({
  fields: {
    campaign: { type: CampaignV2GqlType },
  },
  name: Typename.CampaignV2ForSlugResponse,
});

export default CampaignV2ForSlugResponseGqlType;
