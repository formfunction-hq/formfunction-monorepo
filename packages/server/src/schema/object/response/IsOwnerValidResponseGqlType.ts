import { GraphQLBoolean, GraphQLObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const IsOwnerValidResponseGqlType = new GraphQLObjectType({
  fields: {
    isValid: { type: gqlNonNull(GraphQLBoolean) },
  },
  name: Typename.IsOwnerValidResponse,
});

export default IsOwnerValidResponseGqlType;
