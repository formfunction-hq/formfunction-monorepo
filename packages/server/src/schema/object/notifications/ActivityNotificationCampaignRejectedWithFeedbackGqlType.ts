import { GraphQLObjectType, GraphQLString } from "graphql";
import IActivityNotificationGqlType, {
  IACTIVITY_NOTIFICATION_FIELDS,
} from "src/schema/interface/IActivityNotificationGqlType";
import ActivityNotificationCampaignInfoGqlType from "src/schema/object/notifications/ActivityNotificationCampaignInfoGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const ActivityNotificationCampaignRejectedWithFeedbackGqlType =
  new GraphQLObjectType({
    fields: {
      ...IACTIVITY_NOTIFICATION_FIELDS,
      campaignInfo: {
        type: gqlNonNull(ActivityNotificationCampaignInfoGqlType),
      },
      feedback: { type: gqlNonNull(GraphQLString) },
    },
    interfaces: [IActivityNotificationGqlType],
    name: Typename.ActivityNotificationCampaignRejectedWithFeedback,
  });

export default ActivityNotificationCampaignRejectedWithFeedbackGqlType;
