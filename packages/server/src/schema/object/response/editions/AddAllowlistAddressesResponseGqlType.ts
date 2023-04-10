import { GraphQLObjectType } from "graphql";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const AddAllowlistAddressesResponseGqlType = new GraphQLObjectType({
  fields: {
    addedAddresses: { type: gqlNonNullListOfNonNull(PublicKeyScalarGqlType) },
  },
  name: Typename.AddAllowlistAddressesResponse,
});

export default AddAllowlistAddressesResponseGqlType;
