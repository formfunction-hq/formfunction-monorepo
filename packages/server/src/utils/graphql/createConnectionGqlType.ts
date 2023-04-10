import { GraphQLInt, GraphQLObjectType } from "graphql";
import PageInfoGqlType from "src/schema/object/PageInfoGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

/**
 * Conforms to https://relay.dev/graphql/connections.htm#sec-Connection-Types.
 */
export default function createConnectionGqlType<T extends GraphQLObjectType>(
  edgeType: T,
  typename: Typename
) {
  return new GraphQLObjectType({
    fields: {
      edges: {
        type: gqlNonNullListOfNonNull(edgeType),
      },
      pageInfo: { type: gqlNonNull(PageInfoGqlType) },
      totalCount: { type: gqlNonNull(GraphQLInt) },
    },
    name: typename,
  });
}
