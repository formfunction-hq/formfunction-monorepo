import { GraphQLFieldConfig } from "graphql";
import UserQueriesQueryResponseGqlType from "src/schema/object/response/user/UserQueriesQueryResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const userQueriesQueryField: GraphQLFieldConfig<unknown, any> = {
  description: "Query field for User queries.",
  resolve: () => ({}),
  type: gqlNonNull(UserQueriesQueryResponseGqlType),
};

export default userQueriesQueryField;
