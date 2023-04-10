import { GraphQLObjectType } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import MetadataAccountGqlType from "src/schema/object/MetadataAccountGqlType";

const ShareInfoAndSwapForTooniesResponse = new GraphQLObjectType({
  fields: {
    proofOfOwnershipTokenMetadataAccount: {
      type: gqlNonNull(MetadataAccountGqlType),
    },
  },
  name: Typename.ShareInfoAndSwapForTooniesResponse,
});

export default ShareInfoAndSwapForTooniesResponse;
