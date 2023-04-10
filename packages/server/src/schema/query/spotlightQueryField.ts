import { GraphQLFieldConfig } from "graphql";
import SpotlightResponseGqlType from "src/schema/object/response/SpotlightResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const spotlightQueryField: GraphQLFieldConfig<unknown, any> = {
  description: "Namespace field for Spotlight related queries.",
  resolve: () => ({}),
  type: gqlNonNull(SpotlightResponseGqlType),
};

export default spotlightQueryField;
