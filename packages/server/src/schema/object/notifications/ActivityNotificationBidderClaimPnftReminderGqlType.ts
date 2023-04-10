import { GraphQLObjectType } from "graphql";
import IActivityNotificationGqlType, {
  IACTIVITY_NOTIFICATION_FIELDS,
} from "src/schema/interface/IActivityNotificationGqlType";
import ActivityNotificationLinkActionGqlType from "src/schema/object/notifications/actions/ActivityNotificationLinkActionGqlType";
import ActivityNotificationNftInfoGqlType from "src/schema/object/notifications/ActivityNotificationNftInfoGqlType";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const ActivityNotificationBidderClaimPnftReminderGqlType =
  new GraphQLObjectType({
    fields: {
      ...IACTIVITY_NOTIFICATION_FIELDS,
      action: { type: ActivityNotificationLinkActionGqlType },
      nftInfo: { type: gqlNonNull(ActivityNotificationNftInfoGqlType) },
      pnftCloseDate: { type: gqlNonNull(TimestamptzScalarGqlType) },
    },
    interfaces: [IActivityNotificationGqlType],
    name: Typename.ActivityNotificationBidderClaimPnftReminder,
  });

export default ActivityNotificationBidderClaimPnftReminderGqlType;
