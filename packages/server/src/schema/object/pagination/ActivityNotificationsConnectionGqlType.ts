import ActivityNotificationsEdgeGqlType from "src/schema/object/pagination/ActivityNotificationsEdgeGqlType";
import Typename from "src/types/enums/Typename";
import createConnectionGqlType from "src/utils/graphql/createConnectionGqlType";

const ActivityNotificationsConnectionGqlType = createConnectionGqlType(
  ActivityNotificationsEdgeGqlType,
  Typename.ActivityNotificationsConnection
);

export default ActivityNotificationsConnectionGqlType;
