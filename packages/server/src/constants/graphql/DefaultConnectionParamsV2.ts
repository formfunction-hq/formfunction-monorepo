import { GraphQLString } from "graphql";
import PaginationAmountGqlType from "src/schema/scalar/PaginationAmountGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

// Uses PaginationAmountGqlType for `first` instead of GraphQLInt
// so that we have reasonable limits on how much information can
// be queried from our connection queries.
// NOTE: we cannot change the original defaults for backwards
// compatibility reasons
const DEFAULT_CONNECTION_PARAMS_V2 = {
  after: { type: GraphQLString },
  first: { type: gqlNonNull(PaginationAmountGqlType) },
};

export default DEFAULT_CONNECTION_PARAMS_V2;
