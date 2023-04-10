import { GraphQLID, GraphQLInputObjectType } from "graphql";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const NftOffersInputGqlType = new GraphQLInputObjectType({
  fields: {
    mint: { type: gqlNonNull(PublicKeyScalarGqlType) },
    viewerId: { type: GraphQLID },
  },
  name: Typename.NftOffersInput,
});

export default NftOffersInputGqlType;
