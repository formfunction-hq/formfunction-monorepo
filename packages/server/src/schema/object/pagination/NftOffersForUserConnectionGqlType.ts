import NftOffersForUserEdgeGqlType from "src/schema/object/pagination/NftOffersForUserEdgeGqlType";
import Typename from "src/types/enums/Typename";
import createConnectionGqlType from "src/utils/graphql/createConnectionGqlType";

const NftOffersForUserConnectionGqlType = createConnectionGqlType(
  NftOffersForUserEdgeGqlType,
  Typename.NftOffersForUserConnection
);

export default NftOffersForUserConnectionGqlType;
