import { GraphQLInputObjectType, GraphQLString } from "graphql";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const BidToCancelInputGqlType = new GraphQLInputObjectType({
  fields: {
    mint: { type: gqlNonNull(PublicKeyScalarGqlType) },
    userId: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.BidToCancelInput,
});

export default BidToCancelInputGqlType;
