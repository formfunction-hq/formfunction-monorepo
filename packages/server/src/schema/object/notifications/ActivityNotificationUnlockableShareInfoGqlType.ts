import { GraphQLObjectType } from "graphql";
import IActivityNotificationGqlType, {
  IACTIVITY_NOTIFICATION_FIELDS,
} from "src/schema/interface/IActivityNotificationGqlType";
import ActivityNotificationLinkActionGqlType from "src/schema/object/notifications/actions/ActivityNotificationLinkActionGqlType";
import ActivityNotificationNftInfoGqlType from "src/schema/object/notifications/ActivityNotificationNftInfoGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const ActivityNotificationUnlockableShareInfoGqlType = new GraphQLObjectType({
  fields: {
    ...IACTIVITY_NOTIFICATION_FIELDS,
    action: { type: ActivityNotificationLinkActionGqlType },
    nftInfo: { type: gqlNonNull(ActivityNotificationNftInfoGqlType) },
  },
  interfaces: [IActivityNotificationGqlType],
  name: Typename.ActivityNotificationUnlockableShareInfo,
});

export default ActivityNotificationUnlockableShareInfoGqlType;
