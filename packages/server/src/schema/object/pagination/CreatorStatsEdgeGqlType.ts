import CreatorStatsGqlType from "src/schema/object/CreatorStatsGqlType";
import Typename from "src/types/enums/Typename";
import createEdgeGqlType from "src/utils/graphql/createEdgeGqlType";

const CreatorStatsEdgeGqlType = createEdgeGqlType(
  CreatorStatsGqlType,
  Typename.CreatorStatsEdge
);

export default CreatorStatsEdgeGqlType;
