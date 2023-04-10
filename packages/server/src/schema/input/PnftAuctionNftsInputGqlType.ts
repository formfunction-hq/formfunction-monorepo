import { GraphQLInputObjectType } from "graphql";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const PnftAuctionNftsInputGqlType = new GraphQLInputObjectType({
  fields: {
    masterEditionPnftId: { type: gqlNonNull(PublicKeyScalarGqlType) },
  },
  name: Typename.PnftAuctionNftsInput,
});

export default PnftAuctionNftsInputGqlType;
