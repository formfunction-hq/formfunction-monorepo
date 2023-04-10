import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";
import SpotlightHeroUnitLayoutGqlType from "src/schema/enum/SpotlightHeroUnitLayoutGqlType";
import SpotlightStatusGqlType from "src/schema/enum/SpotlightStatusGqlType";
import AssetGqlType from "src/schema/object/AssetGqlType";
import spotlightInfoResolver from "src/resolvers/query/nested/spotlights/spotlightInfoResolver";
import gqlNonNullListOfNonNull from "src/utils/graphql/gqlNonNullListOfNonNull";
import UserGqlType from "src/schema/object/UserGqlType";

const SpotlightInfoGqlType = new GraphQLObjectType({
  fields: {
    asset: { type: gqlNonNull(AssetGqlType) },
    description: { type: gqlNonNull(GraphQLString) },
    label: { type: gqlNonNull(GraphQLString) },
    status: { type: gqlNonNull(SpotlightStatusGqlType) },
    statusOverride: {
      description: "Used in cases where override is set in the DB",
      type: GraphQLString,
    },
    title: { type: gqlNonNull(GraphQLString) },
    url: {
      description:
        "Can be null for cases where we want to spotlight something" +
        " where a link is not available yet.",
      type: GraphQLString,
    },
    users: { type: gqlNonNullListOfNonNull(UserGqlType) },
  },
  name: Typename.SpotlightInfo,
});

const SpotlightGqlType = new GraphQLObjectType({
  fields: {
    endTime: { type: gqlNonNull(TimestamptzScalarGqlType) },
    heroUnitLayout: { type: gqlNonNull(SpotlightHeroUnitLayoutGqlType) },
    id: { type: gqlNonNull(GraphQLID) },
    spotlightInfo: {
      resolve: spotlightInfoResolver,
      type: gqlNonNull(SpotlightInfoGqlType),
    },
    startTime: { type: gqlNonNull(TimestamptzScalarGqlType) },
  },
  name: Typename.Spotlight,
});

export default SpotlightGqlType;
