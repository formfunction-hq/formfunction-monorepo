import { GraphQLString, GraphQLInt } from "graphql";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const DEFAULT_CONNECTION_PARAMS = {
  after: { type: GraphQLString },
  first: { type: gqlNonNull(GraphQLInt) },
};

export default DEFAULT_CONNECTION_PARAMS;
