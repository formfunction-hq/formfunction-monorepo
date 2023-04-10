import { GraphQLInputObjectType } from "graphql";
import { CAMPAIGN_FOR_SLUG_INPUT_FIELDS } from "src/schema/input/campaigns/CampaignForSlugInputGqlType";
import CreatePostBaseInputGqlType from "src/schema/input/posts/CreatePostBaseInputGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import PollInputGqlType from "src/schema/input/posts/PollInputGqlType";

const CreatePostWithPollForCampaignInputGqlType = new GraphQLInputObjectType({
  fields: {
    ...CAMPAIGN_FOR_SLUG_INPUT_FIELDS,
    pollInput: { type: gqlNonNull(PollInputGqlType) },
    postInput: { type: gqlNonNull(CreatePostBaseInputGqlType) },
  },
  name: Typename.CreatePostWithPollForCampaignInput,
});

export default CreatePostWithPollForCampaignInputGqlType;
