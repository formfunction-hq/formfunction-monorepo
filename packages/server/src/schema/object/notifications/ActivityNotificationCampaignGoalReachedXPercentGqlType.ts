import { GraphQLInt, GraphQLObjectType } from "graphql";
import IActivityNotificationGqlType, {
  IACTIVITY_NOTIFICATION_FIELDS,
} from "src/schema/interface/IActivityNotificationGqlType";
import ActivityNotificationCampaignInfoGqlType from "src/schema/object/notifications/ActivityNotificationCampaignInfoGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const ActivityNotificationCampaignGoalReachedXPercentGqlType =
  new GraphQLObjectType({
    fields: {
      ...IACTIVITY_NOTIFICATION_FIELDS,
      campaignInfo: {
        type: gqlNonNull(ActivityNotificationCampaignInfoGqlType),
      },
      percentAsNumber: { type: gqlNonNull(GraphQLInt) },
    },
    interfaces: [IActivityNotificationGqlType],
    name: Typename.ActivityNotificationCampaignGoalReachedXPercent,
  });

export default ActivityNotificationCampaignGoalReachedXPercentGqlType;
