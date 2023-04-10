import { GraphQLID, GraphQLInputObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const DeleteReactionForPostInputGqlType = new GraphQLInputObjectType({
  fields: {
    postId: { type: gqlNonNull(GraphQLID) },
  },
  name: Typename.DeleteReactionForPostInput,
});

export default DeleteReactionForPostInputGqlType;
