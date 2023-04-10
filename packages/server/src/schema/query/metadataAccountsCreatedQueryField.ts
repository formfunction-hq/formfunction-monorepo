import { GraphQLFieldConfig } from "graphql";
import MetadataAccountsCreatedResponseGqlType from "src/schema/object/response/MetadataAccountsCreatedResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const metadataAccountsCreatedQueryField: GraphQLFieldConfig<unknown, any> = {
  resolve: () => ({}),
  type: gqlNonNull(MetadataAccountsCreatedResponseGqlType),
};

export default metadataAccountsCreatedQueryField;
