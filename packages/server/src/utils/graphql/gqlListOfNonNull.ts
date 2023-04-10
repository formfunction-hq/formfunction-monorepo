import { GraphQLList, GraphQLNonNull, GraphQLType } from "graphql";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

function gqlListOfNonNull<T extends GraphQLType>(
  graphqlType: T
): GraphQLList<GraphQLNonNull<T>> {
  return new GraphQLList(gqlNonNull(graphqlType));
}

export default gqlListOfNonNull;
