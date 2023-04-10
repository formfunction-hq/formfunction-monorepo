import { GraphQLInputObjectType, GraphQLString } from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const NftTransactionsForImportInputGqlType = new GraphQLInputObjectType({
  fields: {
    mintAddress: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.NftTransactionsForImportInput,
});

export default NftTransactionsForImportInputGqlType;
