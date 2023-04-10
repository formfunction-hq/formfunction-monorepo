import NftOfferForUserGqlType from "src/schema/object/NftOfferForUserGqlType";
import Typename from "src/types/enums/Typename";
import createEdgeGqlType from "src/utils/graphql/createEdgeGqlType";

const NftOffersForUserEdgeGqlType = createEdgeGqlType(
  NftOfferForUserGqlType,
  Typename.NftOffersForUserEdge
);

export default NftOffersForUserEdgeGqlType;
