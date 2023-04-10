import { GraphQLObjectType } from "graphql";
import PostGqlType from "src/schema/union/PostGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CreatePostBaseForCampaignResponseGqlType = new GraphQLObjectType({
  fields: {
    post: {
      type: gqlNonNull(PostGqlType),
    },
  },
  name: Typename.CreatePostBaseForCampaignResponse,
});

export default CreatePostBaseForCampaignResponseGqlType;
