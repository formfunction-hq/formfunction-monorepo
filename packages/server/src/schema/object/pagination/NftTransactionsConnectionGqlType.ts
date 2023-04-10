import NftTransactionsEdgeGqlType from "src/schema/object/pagination/NftTransactionsEdgeGqlType";
import Typename from "src/types/enums/Typename";
import createConnectionGqlType from "src/utils/graphql/createConnectionGqlType";

const NftTransactionsConnectionGqlType = createConnectionGqlType(
  NftTransactionsEdgeGqlType,
  Typename.NftTransactionsConnection
);

export default NftTransactionsConnectionGqlType;
