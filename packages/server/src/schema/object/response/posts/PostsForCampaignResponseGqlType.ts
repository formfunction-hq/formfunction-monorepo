import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { GraphQLObjectType } from "graphql";
import DEFAULT_CONNECTION_PARAMS from "src/constants/graphql/DefaultConnectionParams";
import logErrorsForResolver from "src/middleware/logErrorsForResolver";
import postsForCampaignConnectionResolver from "src/resolvers/query/nested/posts/postsForCampaignConnectionResolver";
import PostsForCampaignInputGqlType from "src/schema/input/posts/PostsForCampaignInputGqlType";
import PostsConnectionGqlType from "src/schema/object/pagination/PostsConnectionGqlType";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import {
  PostsConnection,
  PostsForCampaignInput,
} from "src/__generated__/generated";

const PostsForCampaignResponseGqlType = new GraphQLObjectType({
  fields: {
    posts: {
      args: {
        ...DEFAULT_CONNECTION_PARAMS,
        input: { type: gqlNonNull(PostsForCampaignInputGqlType) },
      },
      async resolve(
        _source,
        {
          after,
          first,
          input,
        }: {
          after?: Maybe<string>;
          first?: number;
          input: PostsForCampaignInput;
        },
        context: MyContext
      ): Promise<PostsConnection> {
        return logErrorsForResolver(context.req, () =>
          postsForCampaignConnectionResolver(
            context,
            after ?? null,
            first!,
            input
          )
        );
      },
      type: gqlNonNull(PostsConnectionGqlType),
    },
  },
  name: Typename.PostsForCampaignResponse,
});

export default PostsForCampaignResponseGqlType;
