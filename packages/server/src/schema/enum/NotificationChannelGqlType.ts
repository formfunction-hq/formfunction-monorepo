import { GraphQLEnumType } from "graphql";
import Typename from "src/types/enums/Typename";

/**
 * IMPORTANT: keep values in sync with the NotificationChannel DB table.
 */
const NotificationChannelGqlType = new GraphQLEnumType({
  name: Typename.NotificationChannel,
  values: {
    ActivityFeed: {},
    Email: {},
  },
});

export default NotificationChannelGqlType;
