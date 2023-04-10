import { GraphQLObjectType } from "graphql";
import CommentsForPostResponseGqlType from "src/schema/object/response/comments/CommentsForPostResponseGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CommentQueriesResponseGqlType = new GraphQLObjectType({
  fields: {
    commentsForPost: {
      resolve: () => ({}),
      type: gqlNonNull(CommentsForPostResponseGqlType),
    },
  },
  name: Typename.CommentQueriesResponse,
});

export default CommentQueriesResponseGqlType;
