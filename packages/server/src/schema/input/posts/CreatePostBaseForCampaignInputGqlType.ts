import { GraphQLInputObjectType, GraphQLString } from "graphql";
import { CAMPAIGN_FOR_SLUG_INPUT_FIELDS } from "src/schema/input/campaigns/CampaignForSlugInputGqlType";
import CreatePostBaseInputGqlType from "src/schema/input/posts/CreatePostBaseInputGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CreatePostBaseForCampaignInputGqlType = new GraphQLInputObjectType({
  fields: {
    ...CAMPAIGN_FOR_SLUG_INPUT_FIELDS,
    airdropMasterEditionMint: { type: GraphQLString },
    postInput: { type: gqlNonNull(CreatePostBaseInputGqlType) },
  },
  name: Typename.CreatePostBaseForCampaignInput,
});

export default CreatePostBaseForCampaignInputGqlType;
