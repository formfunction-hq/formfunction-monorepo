import { GraphQLInputObjectType } from "graphql";
import NftOfferForUserKindGqlType from "src/schema/enum/NftOfferForUserKindGqlType";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const NftOffersForUserInputGqlType = new GraphQLInputObjectType({
  fields: {
    kinds: { type: gqlNonNullListOfNonNull(NftOfferForUserKindGqlType) },
    userId: { type: gqlNonNull(PublicKeyScalarGqlType) },
  },
  name: Typename.NftOffersForUserInput,
});

export default NftOffersForUserInputGqlType;
