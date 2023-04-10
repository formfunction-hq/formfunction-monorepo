import SpotlightGqlType from "src/schema/object/SpotlightGqlType";
import Typename from "src/types/enums/Typename";
import createEdgeGqlType from "src/utils/graphql/createEdgeGqlType";

const SpotlightsEdgeGqlType = createEdgeGqlType(
  SpotlightGqlType,
  Typename.SpotlightsEdge
);

export default SpotlightsEdgeGqlType;
