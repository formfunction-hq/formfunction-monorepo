import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import { ActivityNotificationCampaignAddedAsTeamMember } from "src/__generated__/generated";
import convertCampaignNotificationInfo from "src/utils/notifications/convert/convertCampaignNotificationInfo";
import getActivityNotificationLinkAction from "src/utils/notifications/actions/getActivityNotificationLinkAction";
import getCampaignLinkRelative from "formfn-shared/dist/utils/links/getCampaignLinkRelative";
import ConvertCampaignNotificationInfoType from "src/types/convert/ConvertCampaignNotificationInfoType";

export default function convertCampaignApprovedNotification(
  notification: ConvertActivityNotificationType,
  campaign: ConvertCampaignNotificationInfoType
): ActivityNotificationCampaignAddedAsTeamMember {
  return {
    action: getActivityNotificationLinkAction(
      `${getCampaignLinkRelative(campaign.Creator.username, campaign.slug)}`,
      "Go to campaign"
    ),
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationCampaignAddedAsTeamMember,
    campaignInfo: convertCampaignNotificationInfo(campaign),
  };
}
