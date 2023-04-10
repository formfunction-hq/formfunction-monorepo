import { GraphQLFieldConfig } from "graphql";
import MetadataAccountsForSeriesResponseGqlType from "src/schema/object/response/MetadataAccountsForSeriesResponseGqlType";

const metadataAccountsForSeriesQueryField: GraphQLFieldConfig<unknown, any> = {
  resolve: () => ({}),
  type: MetadataAccountsForSeriesResponseGqlType,
};

export default metadataAccountsForSeriesQueryField;
