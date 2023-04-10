import CollectorStatsGqlType from "src/schema/object/CollectorStatsGqlType";
import Typename from "src/types/enums/Typename";
import createEdgeGqlType from "src/utils/graphql/createEdgeGqlType";

const CollectorStatsEdgeGqlType = createEdgeGqlType(
  CollectorStatsGqlType,
  Typename.CollectorStatsEdge
);

export default CollectorStatsEdgeGqlType;
