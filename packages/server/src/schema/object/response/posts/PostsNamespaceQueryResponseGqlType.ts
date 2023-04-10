import { GraphQLObjectType } from "graphql";
import PostsForCampaignResponseGqlType from "src/schema/object/response/posts/PostsForCampaignResponseGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const PostsNamespaceQueryResponseGqlType = new GraphQLObjectType({
  fields: {
    postsForCampaign: {
      resolve: () => ({}),
      type: gqlNonNull(PostsForCampaignResponseGqlType),
    },
  },
  name: Typename.PostsNamespaceQueryResponse,
});

export default PostsNamespaceQueryResponseGqlType;
