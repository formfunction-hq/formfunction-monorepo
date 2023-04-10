import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import AssetGqlType from "src/schema/object/AssetGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const ActivityNotificationNftInfoGqlType = new GraphQLObjectType({
  fields: {
    editionNumber: { type: GraphQLInt },
    mint: { type: gqlNonNull(GraphQLString) },
    name: { type: gqlNonNull(GraphQLString) },
    nftAsset: { type: gqlNonNull(AssetGqlType) },
  },
  name: Typename.ActivityNotificationNftInfo,
});

export default ActivityNotificationNftInfoGqlType;
