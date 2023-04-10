import { GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const DeleteNftInputGqlType = new GraphQLInputObjectType({
  fields: {
    mint: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.DeleteNftInput,
});

export default DeleteNftInputGqlType;
