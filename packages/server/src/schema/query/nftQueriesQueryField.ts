import { GraphQLFieldConfig } from "graphql";
import NftQueriesResponseGqlType from "src/schema/object/response/nft/NftQueriesResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const nftQueriesQueryField: GraphQLFieldConfig<unknown, any> = {
  description: "Query field that houses NFT queries.",
  resolve: () => ({}),
  type: gqlNonNull(NftQueriesResponseGqlType),
};

export default nftQueriesQueryField;
