import { GraphQLID, GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const DeleteCommentForPostInputGqlType = new GraphQLInputObjectType({
  fields: {
    commentId: { type: gqlNonNull(GraphQLID) },
  },
  name: Typename.DeleteCommentForPostInput,
});

export default DeleteCommentForPostInputGqlType;
