import { GraphQLBoolean, GraphQLObjectType } from "graphql";
import NftTransactionGqlType from "src/schema/object/NftTransactionGqlType";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

export const NFT_OFFER_FIELDS = {
  expirationDate: { type: gqlNonNull(TimestamptzScalarGqlType) },
  isValid: {
    description:
      "Indication on whether offer is valid or not. We still surface" +
      " invalid offers if the viewer made the offer and it hasn't been" +
      " cancelled and refunded yet so that they can always cancel and refund themselves.",
    type: gqlNonNull(GraphQLBoolean),
  },
  transaction: { type: gqlNonNull(NftTransactionGqlType) },
};

const NftOfferGqlType = new GraphQLObjectType({
  fields: NFT_OFFER_FIELDS,
  name: Typename.NftOffer,
});

export default NftOfferGqlType;
