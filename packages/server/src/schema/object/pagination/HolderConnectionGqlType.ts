import HolderEdgeGqlType from "src/schema/object/pagination/HolderEdgeGqlType";
import Typename from "src/types/enums/Typename";
import createConnectionGqlType from "src/utils/graphql/createConnectionGqlType";

const HolderConnectionGqlType = createConnectionGqlType(
  HolderEdgeGqlType,
  Typename.HolderConnection
);

export default HolderConnectionGqlType;
