import { GraphQLObjectType } from "graphql";
import ReactionTypeGqlType from "src/schema/enum/ReactionTypeGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const DeleteReactionForPostResponseGqlType = new GraphQLObjectType({
  fields: {
    type: { type: gqlNonNull(ReactionTypeGqlType) },
  },
  name: Typename.DeleteReactionForPostResponse,
});

export default DeleteReactionForPostResponseGqlType;
