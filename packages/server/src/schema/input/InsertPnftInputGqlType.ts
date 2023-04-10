import { GraphQLInputObjectType, GraphQLInt, GraphQLString } from "graphql";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const InsertPnftInputGqlType = new GraphQLInputObjectType({
  fields: {
    edition: { type: gqlNonNull(GraphQLInt) },
    ownerId: { type: gqlNonNull(GraphQLString) },
    pnftLimitedEditionMint: { type: gqlNonNull(PublicKeyScalarGqlType) },
    pnftMasterEditionMint: { type: gqlNonNull(PublicKeyScalarGqlType) },
  },
  name: Typename.InsertPnftInput,
});

export default InsertPnftInputGqlType;
