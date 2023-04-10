import { GraphQLID, GraphQLInputObjectType } from "graphql";
import { CAMPAIGN_FOR_SLUG_INPUT_FIELDS } from "src/schema/input/campaigns/CampaignForSlugInputGqlType";
import Typename from "src/types/enums/Typename";

const PostsForCampaignInputGqlType = new GraphQLInputObjectType({
  fields: {
    ...CAMPAIGN_FOR_SLUG_INPUT_FIELDS,
    viewerId: { type: GraphQLID },
  },
  name: Typename.PostsForCampaignInput,
});

export default PostsForCampaignInputGqlType;
