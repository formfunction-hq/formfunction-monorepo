import { GraphQLFieldConfig } from "graphql";
import StatsNamespaceResponseGqlType from "src/schema/object/response/stats/StatsNamespaceResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const statsNamespaceQueryField: GraphQLFieldConfig<unknown, any> = {
  description: "Namespace field for various creator/collector stats.",
  resolve: () => ({}),
  type: gqlNonNull(StatsNamespaceResponseGqlType),
};

export default statsNamespaceQueryField;
