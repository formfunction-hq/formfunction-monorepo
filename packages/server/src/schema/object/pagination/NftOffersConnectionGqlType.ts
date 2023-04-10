import NftOffersEdgeGqlType from "src/schema/object/pagination/NftOffersEdgeGqlType ";
import Typename from "src/types/enums/Typename";
import createConnectionGqlType from "src/utils/graphql/createConnectionGqlType";

const NftOffersConnectionGqlType = createConnectionGqlType(
  NftOffersEdgeGqlType,
  Typename.NftOffersConnection
);

export default NftOffersConnectionGqlType;
