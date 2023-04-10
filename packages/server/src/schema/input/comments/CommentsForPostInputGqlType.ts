import { GraphQLID, GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CommentsForPostInputGqlType = new GraphQLInputObjectType({
  fields: {
    postId: { type: gqlNonNull(GraphQLID) },
  },
  name: Typename.CommentsForPostInput,
});

export default CommentsForPostInputGqlType;
