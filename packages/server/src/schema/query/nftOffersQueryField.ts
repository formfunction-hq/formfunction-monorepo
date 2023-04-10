import { GraphQLFieldConfig } from "graphql";
import NftOffersResponseGqlType from "src/schema/object/response/NftOffersResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const nftOffersQueryField: GraphQLFieldConfig<unknown, any> = {
  resolve: () => ({}),
  type: gqlNonNull(NftOffersResponseGqlType),
};

export default nftOffersQueryField;
