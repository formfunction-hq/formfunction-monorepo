import NftOfferGqlType from "src/schema/object/NftOfferGqlType";
import Typename from "src/types/enums/Typename";
import createEdgeGqlType from "src/utils/graphql/createEdgeGqlType";

const NftOffersEdgeGqlType = createEdgeGqlType(
  NftOfferGqlType,
  Typename.NftOffersEdge
);

export default NftOffersEdgeGqlType;
