import { GraphQLInterfaceType } from "graphql";
import AccountInfoGqlType from "src/schema/object/AccountInfoGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const IAccountGqlType = new GraphQLInterfaceType({
  fields: {
    accountInfo: { type: gqlNonNull(AccountInfoGqlType) },
  },
  name: Typename.IAccount,
});

export default IAccountGqlType;
