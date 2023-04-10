import { GraphQLObjectType, GraphQLString } from "graphql";
import AssetGqlType from "src/schema/object/AssetGqlType";
import UserGqlType from "src/schema/object/UserGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const ActivityNotificationCampaignInfoGqlType = new GraphQLObjectType({
  fields: {
    creator: { type: gqlNonNull(UserGqlType) },
    previewAsset: { type: gqlNonNull(AssetGqlType) },
    slug: { type: gqlNonNull(GraphQLString) },
    title: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.ActivityNotificationCampaignInfo,
});

export default ActivityNotificationCampaignInfoGqlType;
