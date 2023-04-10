import { GraphQLFieldConfig } from "graphql";
import MetadataAccountsForAddressResponseGqlType from "src/schema/object/response/MetadataAccountsForAddressResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

// TODO[@arcticmatt]: delete! not used anymore
const metadataAccountsForAddressQueryField: GraphQLFieldConfig<unknown, any> = {
  resolve: () => ({}),
  type: gqlNonNull(MetadataAccountsForAddressResponseGqlType),
};

export default metadataAccountsForAddressQueryField;
