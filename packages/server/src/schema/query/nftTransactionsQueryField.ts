import { GraphQLFieldConfig } from "graphql";
import NftTransactionsResponseGqlType from "src/schema/object/response/NftTransactionsResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const nftTransactionsQueryField: GraphQLFieldConfig<unknown, any> = {
  resolve: () => ({}),
  type: gqlNonNull(NftTransactionsResponseGqlType),
};

export default nftTransactionsQueryField;
