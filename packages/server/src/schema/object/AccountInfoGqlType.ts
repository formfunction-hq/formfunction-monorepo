import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
} from "graphql";
import PublicKeyScalarGqlType from "src/schema/scalar/PublicKeyScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const AccountInfoGqlType = new GraphQLObjectType({
  fields: {
    executable: { type: gqlNonNull(GraphQLBoolean) },
    id: { type: gqlNonNull(GraphQLID) },
    lamports: { type: gqlNonNull(GraphQLInt) },
    owner: { type: gqlNonNull(PublicKeyScalarGqlType) },
    pubkey: { type: gqlNonNull(PublicKeyScalarGqlType) },
  },
  name: Typename.AccountInfo,
});

export default AccountInfoGqlType;
