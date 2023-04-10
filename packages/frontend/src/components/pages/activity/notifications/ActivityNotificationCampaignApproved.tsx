import graphql from "babel-plugin-relay/macro";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import ActivityNotificationLinkActionButton from "components/pages/activity/ActivityNotificationLinkActionButton";
import { ActivityNotificationCampaignApproved_ActivityNotificationCampaignApproved$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationCampaignApproved_ActivityNotificationCampaignApproved.graphql";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";
import AssetForNotificationCampaignInfo from "components/assets/AssetForNotificationCampaignInfo";

const fragment = graphql`
  fragment ActivityNotificationCampaignApproved_ActivityNotificationCampaignApproved on ActivityNotificationCampaignApproved {
    campaignInfo {
      title

      ...AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo
    }
    action {
      ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationCampaignApproved_ActivityNotificationCampaignApproved$key;
};

export default function ActivityNotificationCampaignApproved({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { campaignInfo } = notificationData;

  return (
    <SystemNotificationContainer
      actionButton={
        notificationData.action == null ? null : (
          <ActivityNotificationLinkActionButton
            action={notificationData.action}
            // Use link_external to avoid the edge case where the user has already
            // client-side navigated to the campaign page, in which case if we used link_internal,
            // clicking this link would show the "you submitted your campaign" UI instead of the
            // published campaign page.
            type="link_external"
          />
        )
      }
      asset={
        <AssetForNotificationCampaignInfo
          activityNotificationCampaignInfo={campaignInfo}
        />
      }
      label={`Your campaign, ${campaignInfo.title}, has been approved.`}
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
