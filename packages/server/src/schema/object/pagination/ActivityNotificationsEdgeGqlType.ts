import ActivityNotificationGqlType from "src/schema/union/ActivityNotificationGqlType";
import Typename from "src/types/enums/Typename";
import createEdgeGqlType from "src/utils/graphql/createEdgeGqlType";

const ActivityNotificationsEdgeGqlType = createEdgeGqlType(
  ActivityNotificationGqlType,
  Typename.ActivityNotificationsEdge
);

export default ActivityNotificationsEdgeGqlType;
