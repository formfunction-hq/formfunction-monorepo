import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import { ActivityNotificationCampaignRejected } from "src/__generated__/generated";
import convertCampaignNotificationInfo from "src/utils/notifications/convert/convertCampaignNotificationInfo";
import getActivityNotificationLinkAction from "src/utils/notifications/actions/getActivityNotificationLinkAction";
import ConvertCampaignNotificationInfoType from "src/types/convert/ConvertCampaignNotificationInfoType";
import HelpCenterLink from "formfn-shared/dist/types/enums/HelpCenterLink";

export default function convertCampaignRejectedNotification(
  notification: ConvertActivityNotificationType,
  campaign: ConvertCampaignNotificationInfoType
): ActivityNotificationCampaignRejected {
  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationCampaignRejected,
    action: getActivityNotificationLinkAction(
      HelpCenterLink.CampaignGuidelines,
      "See campaign guidelines"
    ),
    campaignInfo: convertCampaignNotificationInfo(campaign),
  };
}
