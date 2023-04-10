import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import { ActivityNotificationCampaignCommunityNewUpdateShared } from "src/__generated__/generated";
import convertCampaignNotificationInfo from "src/utils/notifications/convert/convertCampaignNotificationInfo";
import getActivityNotificationLinkAction from "src/utils/notifications/actions/getActivityNotificationLinkAction";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import ConvertCampaignNotificationInfoType from "src/types/convert/ConvertCampaignNotificationInfoType";
import CampaignTab from "formfn-shared/dist/types/enums/CampaignTab";
import CampaignUrlParamKey from "formfn-shared/dist/types/enums/CampaignUrlParamKey";

export default function convertCampaignCommunityNewUpdateSharedNotification(
  notification: ConvertActivityNotificationType,
  campaign: ConvertCampaignNotificationInfoType
): ActivityNotificationCampaignCommunityNewUpdateShared {
  return {
    action: getActivityNotificationLinkAction(
      `${getCampaignLinkRelative(campaign.Creator.username, campaign.slug, {
        [CampaignUrlParamKey.Tab]: CampaignTab.Community,
        [CampaignUrlParamKey.ScrollToContent]: "1",
      })}`,
      "Go to community"
    ),
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationCampaignCommunityNewUpdateShared,
    campaignInfo: convertCampaignNotificationInfo(campaign),
  };
}
