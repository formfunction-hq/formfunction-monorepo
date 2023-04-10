import { GraphQLID, GraphQLInputObjectType } from "graphql";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const AddAllowlistAddressesInputGqlType = new GraphQLInputObjectType({
  fields: {
    addresses: { type: gqlNonNullListOfNonNull(PublicKeyScalarGqlType) },
    masterEditionMint: { type: gqlNonNull(GraphQLID) },
  },
  name: Typename.AddAllowlistAddressesInput,
});

export default AddAllowlistAddressesInputGqlType;
