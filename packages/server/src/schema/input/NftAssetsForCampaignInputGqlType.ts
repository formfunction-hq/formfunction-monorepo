import { GraphQLInputObjectType } from "graphql";
import PaginationAmountGqlType from "src/schema/scalar/PaginationAmountGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const NftAssetsForCampaignInputGqlType = new GraphQLInputObjectType({
  fields: {
    first: { type: gqlNonNull(PaginationAmountGqlType) },
  },
  name: Typename.NftAssetsForCampaignInput,
});

export default NftAssetsForCampaignInputGqlType;
