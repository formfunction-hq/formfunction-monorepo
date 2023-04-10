import { GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CreateCommentForPostInputGqlType = new GraphQLInputObjectType({
  fields: {
    comment: { type: gqlNonNull(GraphQLString) },
    postId: { type: gqlNonNull(GraphQLID) },
  },
  name: Typename.CreateCommentForPostInput,
});

export default CreateCommentForPostInputGqlType;
