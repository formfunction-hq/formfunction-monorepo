import { GraphQLInputObjectType } from "graphql";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const WalletViewerInputGqlType = new GraphQLInputObjectType({
  fields: {
    address: { type: gqlNonNull(PublicKeyScalarGqlType) },
  },
  name: Typename.WalletViewerInput,
});

export default WalletViewerInputGqlType;
