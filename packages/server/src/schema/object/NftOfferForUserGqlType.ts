import { GraphQLObjectType } from "graphql";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import { NFT_OFFER_FIELDS } from "src/schema/object/NftOfferGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const NftOfferForUserGqlType = new GraphQLObjectType({
  fields: {
    ...NFT_OFFER_FIELDS,
    metadataAccount: { type: gqlNonNull(MetadataAccountGqlType) },
  },
  name: Typename.NftOfferForUser,
});

export default NftOfferForUserGqlType;
