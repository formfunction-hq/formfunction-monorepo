import { GraphQLInputObjectType } from "graphql";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const EditionsForMasterEditionMintInputGqlType = new GraphQLInputObjectType({
  fields: {
    masterEditionMint: { type: gqlNonNull(PublicKeyScalarGqlType) },
  },
  name: Typename.EditionsForMasterEditionMintInput,
});

export default EditionsForMasterEditionMintInputGqlType;
