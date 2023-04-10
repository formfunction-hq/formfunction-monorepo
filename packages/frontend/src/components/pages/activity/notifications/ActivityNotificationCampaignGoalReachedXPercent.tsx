import graphql from "babel-plugin-relay/macro";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import ActivityNotificationLinkActionButton from "components/pages/activity/ActivityNotificationLinkActionButton";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";
import AssetForNotificationCampaignInfo from "components/assets/AssetForNotificationCampaignInfo";
import { ActivityNotificationCampaignGoalReachedXPercent_ActivityNotificationCampaignGoalReachedXPercent$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationCampaignGoalReachedXPercent_ActivityNotificationCampaignGoalReachedXPercent.graphql";
import getCampaignGoalReachedXPercentBodyText from "formfn-shared/dist/utils/campaigns/getCampaignGoalReachedXPercentBodyText";

const fragment = graphql`
  fragment ActivityNotificationCampaignGoalReachedXPercent_ActivityNotificationCampaignGoalReachedXPercent on ActivityNotificationCampaignGoalReachedXPercent {
    campaignInfo {
      title

      ...AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo
    }
    percentAsNumber
    action {
      ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationCampaignGoalReachedXPercent_ActivityNotificationCampaignGoalReachedXPercent$key;
};

export default function ActivityNotificationCampaignGoalReachedXPercent({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { campaignInfo, percentAsNumber } = notificationData;

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
      label={getCampaignGoalReachedXPercentBodyText(
        percentAsNumber as 50 | 100,
        campaignInfo.title
      )}
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
