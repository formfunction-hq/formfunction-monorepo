import { GraphQLObjectType, GraphQLString } from "graphql";
import IActivityNotificationGqlType, {
  IACTIVITY_NOTIFICATION_FIELDS,
} from "src/schema/interface/IActivityNotificationGqlType";
import ActivityNotificationNftInfoGqlType from "src/schema/object/notifications/ActivityNotificationNftInfoGqlType";
import PriceGqlType from "src/schema/object/PriceGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const ActivityNotificationOwnerFirstBidReceivedGqlType = new GraphQLObjectType({
  fields: {
    ...IACTIVITY_NOTIFICATION_FIELDS,
    bidPrice: { type: gqlNonNull(PriceGqlType) },
    nftInfo: { type: gqlNonNull(ActivityNotificationNftInfoGqlType) },
    txid: { type: gqlNonNull(GraphQLString) },
  },
  interfaces: [IActivityNotificationGqlType],
  name: Typename.ActivityNotificationOwnerFirstBidReceived,
});

export default ActivityNotificationOwnerFirstBidReceivedGqlType;
