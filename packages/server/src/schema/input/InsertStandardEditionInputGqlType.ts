import { GraphQLInputObjectType, GraphQLString } from "graphql";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const InsertStandardEditionInputGqlType = new GraphQLInputObjectType({
  fields: {
    masterEditionMint: { type: gqlNonNull(PublicKeyScalarGqlType) },
    ownerId: { type: gqlNonNull(GraphQLString) },
    standardEditionMint: { type: gqlNonNull(PublicKeyScalarGqlType) },
  },
  name: Typename.InsertStandardEditionInput,
});

export default InsertStandardEditionInputGqlType;
