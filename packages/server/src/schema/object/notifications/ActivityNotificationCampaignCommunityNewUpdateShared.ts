import { GraphQLObjectType } from "graphql";
import IActivityNotificationGqlType, {
  IACTIVITY_NOTIFICATION_FIELDS,
} from "src/schema/interface/IActivityNotificationGqlType";
import ActivityNotificationCampaignInfoGqlType from "src/schema/object/notifications/ActivityNotificationCampaignInfoGqlType";
import Typename from "src/types/enums/Typename";
import gqlNonNull from "src/utils/graphql/gqlNonNull";

const ActivityNotificationCampaignCommunityNewUpdateSharedGqlType =
  new GraphQLObjectType({
    fields: {
      ...IACTIVITY_NOTIFICATION_FIELDS,
      campaignInfo: {
        type: gqlNonNull(ActivityNotificationCampaignInfoGqlType),
      },
    },
    interfaces: [IActivityNotificationGqlType],
    name: Typename.ActivityNotificationCampaignCommunityNewUpdateShared,
  });

export default ActivityNotificationCampaignCommunityNewUpdateSharedGqlType;
