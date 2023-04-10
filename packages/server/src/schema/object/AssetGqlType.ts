import {
  GraphQLInt,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const AssetDarkModeInfoGqlType = new GraphQLObjectType({
  fields: {
    downloadUrl: { type: gqlNonNull(GraphQLString) },
    path: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.AssetDarkModeInfo,
});

const AssetDimensionsGqlType = new GraphQLObjectType({
  fields: {
    height: { type: gqlNonNull(GraphQLInt) },
    width: { type: gqlNonNull(GraphQLInt) },
  },
  name: Typename.AssetDimensions,
});

const AssetGqlType = new GraphQLObjectType({
  fields: {
    contentType: { type: gqlNonNull(GraphQLString) },
    darkModeInfo: { type: AssetDarkModeInfoGqlType },
    dimensions: { type: AssetDimensionsGqlType },
    downloadUrl: {
      type: gqlNonNull(GraphQLString),
    },
    id: { type: gqlNonNull(GraphQLID) },
    path: { type: gqlNonNull(GraphQLString) },
    videoPlaybackId: { type: GraphQLString },
  },
  name: Typename.Asset,
});

export default AssetGqlType;
