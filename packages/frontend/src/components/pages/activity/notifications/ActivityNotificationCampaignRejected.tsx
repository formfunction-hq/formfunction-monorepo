import graphql from "babel-plugin-relay/macro";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import ActivityNotificationLinkActionButton from "components/pages/activity/ActivityNotificationLinkActionButton";
import { ActivityNotificationCampaignRejected_ActivityNotificationCampaignRejected$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationCampaignRejected_ActivityNotificationCampaignRejected.graphql";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";
import AssetForNotificationCampaignInfo from "components/assets/AssetForNotificationCampaignInfo";

const fragment = graphql`
  fragment ActivityNotificationCampaignRejected_ActivityNotificationCampaignRejected on ActivityNotificationCampaignRejected {
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
  notification: ActivityNotificationCampaignRejected_ActivityNotificationCampaignRejected$key;
};

export default function ActivityNotificationCampaignRejected({
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
          />
        )
      }
      asset={
        <AssetForNotificationCampaignInfo
          activityNotificationCampaignInfo={campaignInfo}
        />
      }
      label={
        `Your campaign, ${campaignInfo.title}, was not approved. See our guidelines` +
        ` to see why it has been rejected.`
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
