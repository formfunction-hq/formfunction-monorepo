import { GraphQLFieldConfig } from "graphql";
import HolderQueriesResponseGqlType from "src/schema/object/response/holder/HolderQueriesResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const holderQueriesQueryField: GraphQLFieldConfig<unknown, any> = {
  description:
    "Query field that houses queries for fetching holders with various criteria",
  resolve: () => ({}),
  type: gqlNonNull(HolderQueriesResponseGqlType),
};

export default holderQueriesQueryField;
