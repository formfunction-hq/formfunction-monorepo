import { GraphQLFieldConfig } from "graphql";
import MetadataAccountsCollectedResponseGqlType from "src/schema/object/response/MetadataAccountsCollectedResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const metadataAccountsCollectedQueryField: GraphQLFieldConfig<unknown, any> = {
  resolve: () => ({}),
  type: gqlNonNull(MetadataAccountsCollectedResponseGqlType),
};

export default metadataAccountsCollectedQueryField;
