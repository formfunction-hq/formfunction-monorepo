import { GraphQLObjectType } from "graphql";
import IActivityNotificationGqlType, {
  IACTIVITY_NOTIFICATION_FIELDS,
} from "src/schema/interface/IActivityNotificationGqlType";
import ActivityNotificationLinkActionGqlType from "src/schema/object/notifications/actions/ActivityNotificationLinkActionGqlType";
import Typename from "src/types/enums/Typename";

const ActivityNotificationBonkClaimGqlType = new GraphQLObjectType({
  fields: {
    ...IACTIVITY_NOTIFICATION_FIELDS,
    action: { type: ActivityNotificationLinkActionGqlType },
  },
  interfaces: [IActivityNotificationGqlType],
  name: Typename.ActivityNotificationBonkClaim,
});

export default ActivityNotificationBonkClaimGqlType;
