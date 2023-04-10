import { GraphQLObjectType, GraphQLString } from "graphql";
import AssetGqlType from "src/schema/object/AssetGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const ActivityNotificationCandyMachineInfoGqlType = new GraphQLObjectType({
  fields: {
    asset: { type: gqlNonNull(AssetGqlType) },
    name: { type: gqlNonNull(GraphQLString) },
  },
  name: Typename.ActivityNotificationCandyMachineInfo,
});

export default ActivityNotificationCandyMachineInfoGqlType;
