import { GraphQLType } from "graphql";
import gqlListOfNonNull from "src/utils/graphql/gqlListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

function gqlNonNullListOfNonNull<T extends GraphQLType>(graphqlType: T) {
  return gqlNonNull(gqlListOfNonNull(graphqlType));
}

export default gqlNonNullListOfNonNull;
