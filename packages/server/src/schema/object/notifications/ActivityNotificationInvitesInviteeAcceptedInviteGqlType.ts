import { GraphQLObjectType } from "graphql";
import IActivityNotificationGqlType, {
  IACTIVITY_NOTIFICATION_FIELDS,
} from "src/schema/interface/IActivityNotificationGqlType";
import Typename from "src/types/enums/Typename";

const ActivityNotificationInvitesInviteeAcceptedInviteGqlType =
  new GraphQLObjectType({
    fields: {
      ...IACTIVITY_NOTIFICATION_FIELDS,
    },
    interfaces: [IActivityNotificationGqlType],
    name: Typename.ActivityNotificationInvitesInviteeAcceptedInvite,
  });

export default ActivityNotificationInvitesInviteeAcceptedInviteGqlType;
