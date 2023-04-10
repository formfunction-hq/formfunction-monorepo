import { GraphQLUnionType } from "graphql";
import ActivityNotificationLinkActionGqlType from "src/schema/object/notifications/actions/ActivityNotificationLinkActionGqlType";
import Typename from "src/types/enums/Typename";

const ActivityNotificationActionGqlType = new GraphQLUnionType({
  name: Typename.ActivityNotificationAction,
  types: [ActivityNotificationLinkActionGqlType],
});

export default ActivityNotificationActionGqlType;
