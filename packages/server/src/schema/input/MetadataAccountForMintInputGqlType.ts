import { GraphQLInputObjectType } from "graphql";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const MetadataAccountForMintInputGqlType = new GraphQLInputObjectType({
  fields: {
    mint: { type: gqlNonNull(PublicKeyScalarGqlType) },
  },
  name: Typename.MetadataAccountForMintInput,
});

export default MetadataAccountForMintInputGqlType;
