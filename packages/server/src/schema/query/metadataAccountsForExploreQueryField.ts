import { GraphQLFieldConfig } from "graphql";
import MetadataAccountsForExploreResponseGqlType from "src/schema/object/response/MetadataAccountsForExploreResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const metadataAccountsForExploreQueryField: GraphQLFieldConfig<unknown, any> = {
  resolve: () => ({}),
  type: gqlNonNull(MetadataAccountsForExploreResponseGqlType),
};

export default metadataAccountsForExploreQueryField;
