import { GraphQLNonNull, GraphQLNullableType } from "graphql";

function gqlNonNull<T extends GraphQLNullableType>(
  graphqlType: T
): GraphQLNonNull<T> {
  return new GraphQLNonNull(graphqlType);
}

export default gqlNonNull;
