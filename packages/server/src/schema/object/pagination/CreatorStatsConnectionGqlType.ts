import CreatorStatsEdgeGqlType from "src/schema/object/pagination/CreatorStatsEdgeGqlType";
import Typename from "src/types/enums/Typename";
import createConnectionGqlType from "src/utils/graphql/createConnectionGqlType";

const CreatorStatsConnectionGqlType = createConnectionGqlType(
  CreatorStatsEdgeGqlType,
  Typename.CreatorStatsConnection
);

export default CreatorStatsConnectionGqlType;
