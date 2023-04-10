import { GraphQLFieldConfig } from "graphql";
import NftOffersForUserResponseGqlType from "src/schema/object/response/NftOffersForUserResponseGqlType";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const nftOffersForUserQueryField: GraphQLFieldConfig<unknown, any> = {
  resolve: () => ({}),
  type: gqlNonNull(NftOffersForUserResponseGqlType),
};

export default nftOffersForUserQueryField;
