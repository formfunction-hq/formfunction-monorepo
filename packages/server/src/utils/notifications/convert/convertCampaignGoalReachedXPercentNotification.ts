import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import { ActivityNotificationCampaignGoalReachedXPercent } from "src/__generated__/generated";
import convertCampaignNotificationInfo from "src/utils/notifications/convert/convertCampaignNotificationInfo";
import ConvertCampaignNotificationInfoType from "src/types/convert/ConvertCampaignNotificationInfoType";

export default function convertCampaignGoalReachedXPercentNotification(
  notification: ConvertActivityNotificationType,
  campaign: ConvertCampaignNotificationInfoType,
  percentAsNumber: 50 | 100
): ActivityNotificationCampaignGoalReachedXPercent {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationCampaignGoalReachedXPercent,
    campaignInfo: convertCampaignNotificationInfo(campaign),
    percentAsNumber,
  };
}
