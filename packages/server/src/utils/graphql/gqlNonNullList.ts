import { GraphQLType, GraphQLList, GraphQLNonNull } from "graphql";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

function gqlNonNullList<T extends GraphQLType>(
  graphqlType: T
): GraphQLNonNull<GraphQLList<T>> {
  return gqlNonNull(new GraphQLList(graphqlType));
}

export default gqlNonNullList;
