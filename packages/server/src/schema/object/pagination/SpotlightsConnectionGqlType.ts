import SpotlightsEdgeGqlType from "src/schema/object/pagination/SpotlightsEdgeGqlType";
import Typename from "src/types/enums/Typename";
import createConnectionGqlType from "src/utils/graphql/createConnectionGqlType";

const SpotlightsConnectionGqlType = createConnectionGqlType(
  SpotlightsEdgeGqlType,
  Typename.SpotlightsConnection
);

export default SpotlightsConnectionGqlType;
