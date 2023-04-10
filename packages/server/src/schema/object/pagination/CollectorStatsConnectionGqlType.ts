import CollectorStatsEdgeGqlType from "src/schema/object/pagination/CollectorStatsEdgeGqlType";
import Typename from "src/types/enums/Typename";
import createConnectionGqlType from "src/utils/graphql/createConnectionGqlType";

const CollectorStatsConnectionGqlType = createConnectionGqlType(
  CollectorStatsEdgeGqlType,
  Typename.CollectorStatsConnection
);

export default CollectorStatsConnectionGqlType;
