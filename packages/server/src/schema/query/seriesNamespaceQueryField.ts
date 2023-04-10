import { GraphQLFieldConfig } from "graphql";
import SeriesNamespaceResponseGqlType from "src/schema/object/response/series/SeriesNamespaceResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const seriesNamespaceQueryField: GraphQLFieldConfig<unknown, any> = {
  description: "Namespace field for series queries.",
  resolve: () => ({}),
  type: gqlNonNull(SeriesNamespaceResponseGqlType),
};

export default seriesNamespaceQueryField;
