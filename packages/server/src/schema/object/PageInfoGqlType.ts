import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

/**
 * GraphQL PageInfo type for implementing cursor-based pagination.
 * See https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo for more info.
 */
const PageInfoGqlType = new GraphQLObjectType({
  fields: {
    endCursor: { type: gqlNonNull(GraphQLString) },
    hasNextPage: { type: gqlNonNull(GraphQLBoolean) },
    hasPreviousPage: { type: gqlNonNull(GraphQLBoolean) },
    startCursor: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.PageInfo,
});

export default PageInfoGqlType;
