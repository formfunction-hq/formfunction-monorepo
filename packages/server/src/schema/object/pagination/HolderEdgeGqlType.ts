import HolderGqlType from "src/schema/object/holder/HolderGqlType";
import Typename from "src/types/enums/Typename";
import createEdgeGqlType from "src/utils/graphql/createEdgeGqlType";

const HolderEdgeGqlType = createEdgeGqlType(HolderGqlType, Typename.HolderEdge);

export default HolderEdgeGqlType;
