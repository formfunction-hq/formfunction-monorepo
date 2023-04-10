import { GraphQLObjectType, GraphQLString } from "graphql";
import IActivityNotificationGqlType, {
  IACTIVITY_NOTIFICATION_FIELDS,
} from "src/schema/interface/IActivityNotificationGqlType";
import ActivityNotificationNftInfoGqlType from "src/schema/object/notifications/ActivityNotificationNftInfoGqlType";
import PriceGqlType from "src/schema/object/PriceGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const ActivityNotificationBidderOutbidGqlType = new GraphQLObjectType({
  fields: {
    ...IACTIVITY_NOTIFICATION_FIELDS,
    nftInfo: { type: gqlNonNull(ActivityNotificationNftInfoGqlType) },
    refundAmount: { type: gqlNonNull(PriceGqlType) },
    txid: { type: gqlNonNull(GraphQLString) },
  },
  interfaces: [IActivityNotificationGqlType],
  name: Typename.ActivityNotificationBidderOutbid,
});

export default ActivityNotificationBidderOutbidGqlType;
