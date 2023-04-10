import { GraphQLObjectType } from "graphql";
import IActivityNotificationGqlType, {
  IACTIVITY_NOTIFICATION_FIELDS,
} from "src/schema/interface/IActivityNotificationGqlType";
import Typename from "src/types/enums/Typename";

const ActivityNotificationAirdropGiftReceivedGqlType = new GraphQLObjectType({
  fields: IACTIVITY_NOTIFICATION_FIELDS,
  interfaces: [IActivityNotificationGqlType],
  name: Typename.ActivityNotificationAirdropGiftReceived,
});

export default ActivityNotificationAirdropGiftReceivedGqlType;
