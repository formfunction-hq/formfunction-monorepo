import graphql from "babel-plugin-relay/macro";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import ActivityNotificationLinkActionButton from "components/pages/activity/ActivityNotificationLinkActionButton";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";
import AssetForNotificationCampaignInfo from "components/assets/AssetForNotificationCampaignInfo";
import { ActivityNotificationCampaignCommunityNewUpdateShared_ActivityNotificationCampaignCommunityNewUpdateShared$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationCampaignCommunityNewUpdateShared_ActivityNotificationCampaignCommunityNewUpdateShared.graphql";

const fragment = graphql`
  fragment ActivityNotificationCampaignCommunityNewUpdateShared_ActivityNotificationCampaignCommunityNewUpdateShared on ActivityNotificationCampaignCommunityNewUpdateShared {
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
  notification: ActivityNotificationCampaignCommunityNewUpdateShared_ActivityNotificationCampaignCommunityNewUpdateShared$key;
};

export default function ActivityNotificationCampaignCommunityNewUpdateShared({
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
      label={`${campaignInfo.title} shared a new community update`}
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
