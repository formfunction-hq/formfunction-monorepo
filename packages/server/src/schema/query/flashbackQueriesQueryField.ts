import { GraphQLFieldConfig } from "graphql";
import FlashbackQueriesResponseGqlType from "src/schema/object/response/flashback/FlashbackQueriesResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const flashbackQueriesQueryField: GraphQLFieldConfig<unknown, any> = {
  description: "Query field that houses Formfunction Flashback queries.",
  resolve: () => ({}),
  type: gqlNonNull(FlashbackQueriesResponseGqlType),
};

export default flashbackQueriesQueryField;
