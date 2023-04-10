import { GraphQLObjectType, GraphQLString } from "graphql";
import IActivityNotificationGqlType, {
  IACTIVITY_NOTIFICATION_FIELDS,
} from "src/schema/interface/IActivityNotificationGqlType";
import ActivityNotificationLinkActionGqlType from "src/schema/object/notifications/actions/ActivityNotificationLinkActionGqlType";
import ActivityNotificationNftInfoGqlType from "src/schema/object/notifications/ActivityNotificationNftInfoGqlType";
import PriceGqlType from "src/schema/object/PriceGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const ActivityNotificationOwnerOfferReceivedGqlType = new GraphQLObjectType({
  fields: {
    ...IACTIVITY_NOTIFICATION_FIELDS,
    action: { type: ActivityNotificationLinkActionGqlType },
    nftInfo: { type: gqlNonNull(ActivityNotificationNftInfoGqlType) },
    offerPrice: { type: gqlNonNull(PriceGqlType) },
    txid: { type: gqlNonNull(GraphQLString) },
  },
  interfaces: [IActivityNotificationGqlType],
  name: Typename.ActivityNotificationOwnerOfferReceived,
});

export default ActivityNotificationOwnerOfferReceivedGqlType;
