import { GraphQLID, GraphQLInputObjectType } from "graphql";
import ReactionTypeGqlType from "src/schema/enum/ReactionTypeGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const CreateReactionForPostInputGqlType = new GraphQLInputObjectType({
  fields: {
    postId: { type: gqlNonNull(GraphQLID) },
    type: { type: gqlNonNull(ReactionTypeGqlType) },
  },
  name: Typename.CreateReactionForPostInput,
});

export default CreateReactionForPostInputGqlType;
