import { GraphQLFieldConfig } from "graphql";
import UsersForExploreResponseGqlType from "src/schema/object/response/UsersForExploreResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const usersForExploreQueryField: GraphQLFieldConfig<unknown, any> = {
  resolve: () => ({}),
  type: gqlNonNull(UsersForExploreResponseGqlType),
};

export default usersForExploreQueryField;
