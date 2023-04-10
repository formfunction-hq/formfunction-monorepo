import { GraphQLObjectType, GraphQLOutputType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

/**
 * Conforms to https://relay.dev/graphql/connections.htm#sec-Edge-Types.
 */
export default function createEdgeGqlType<T extends GraphQLOutputType>(
  nodeType: T,
  typename: Typename
) {
  return new GraphQLObjectType({
    fields: {
      cursor: { type: gqlNonNull(GraphQLString) },
      node: { type: gqlNonNull(nodeType) },
    },
    name: typename,
  });
}
