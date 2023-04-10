import { GraphQLObjectType } from "graphql";
import NftTransactionGqlType from "src/schema/object/NftTransactionGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";

const NftTransactionsForImportResponseGqlType = new GraphQLObjectType({
  fields: {
    transactions: { type: gqlNonNullListOfNonNull(NftTransactionGqlType) },
  },
  name: Typename.NftTransactionsForImportResponse,
});

export default NftTransactionsForImportResponseGqlType;
