import { GraphQLID, GraphQLInterfaceType } from "graphql";
import UserGqlType from "src/schema/object/UserGqlType";
import TimestamptzScalarGqlType from "src/schema/scalar/TimestamptzScalarGqlType";
import ActivityNotificationActionGqlType from "src/schema/union/ActivityNotificationActionGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

export const IACTIVITY_NOTIFICATION_FIELDS = {
  action: { type: ActivityNotificationActionGqlType },
  id: { type: gqlNonNull(GraphQLID) },
  receiver: { type: gqlNonNull(UserGqlType) },
  sender: { type: UserGqlType },
  timeCreated: { type: gqlNonNull(TimestamptzScalarGqlType) },
  timeSeen: { type: TimestamptzScalarGqlType },
};

const IActivityNotificationGqlType = new GraphQLInterfaceType({
  fields: IACTIVITY_NOTIFICATION_FIELDS,
  name: Typename.IActivityNotification,
});

export default IActivityNotificationGqlType;
