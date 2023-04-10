import { GraphQLObjectType } from "graphql";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const OpenBidGqlType = new GraphQLObjectType({
  fields: {
    metadataAccount: { type: gqlNonNull(MetadataAccountGqlType) },
  },
  name: Typename.OpenBid,
});

export default OpenBidGqlType;
