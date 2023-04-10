import NftTransactionGqlType from "src/schema/object/NftTransactionGqlType";
import Typename from "src/types/enums/Typename";
import createEdgeGqlType from "src/utils/graphql/createEdgeGqlType";

const NftTransactionsEdgeGqlType = createEdgeGqlType(
  NftTransactionGqlType,
  Typename.NftTransactionsEdge
);

export default NftTransactionsEdgeGqlType;
