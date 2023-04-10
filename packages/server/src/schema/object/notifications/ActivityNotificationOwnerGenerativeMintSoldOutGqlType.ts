import { GraphQLObjectType } from "graphql";
import IActivityNotificationGqlType, {
  IACTIVITY_NOTIFICATION_FIELDS,
} from "src/schema/interface/IActivityNotificationGqlType";
import ActivityNotificationCandyMachineInfoGqlType from "src/schema/object/notifications/ActivityNotificationCandyMachineInfoGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const ActivityNotificationOwnerGenerativeMintSoldOutGqlType =
  new GraphQLObjectType({
    fields: {
      ...IACTIVITY_NOTIFICATION_FIELDS,
      candyMachineInfo: {
        type: gqlNonNull(ActivityNotificationCandyMachineInfoGqlType),
      },
    },
    interfaces: [IActivityNotificationGqlType],
    name: Typename.ActivityNotificationOwnerGenerativeMintSoldOut,
  });

export default ActivityNotificationOwnerGenerativeMintSoldOutGqlType;
