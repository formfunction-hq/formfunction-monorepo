import { GraphQLInputObjectType } from "graphql";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const PnftInfoInputGqlType = new GraphQLInputObjectType({
  fields: {
    auctionNftMint: { type: gqlNonNull(PublicKeyScalarGqlType) },
  },
  name: Typename.PnftInfoInput,
});

export default PnftInfoInputGqlType;
