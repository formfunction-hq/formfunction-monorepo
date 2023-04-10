import graphql from "babel-plugin-relay/macro";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import ActivityNotificationLinkActionButton from "components/pages/activity/ActivityNotificationLinkActionButton";
import AssetForNotificationCampaignInfo from "components/assets/AssetForNotificationCampaignInfo";
import ActivityNotificationContainer from "components/pages/activity/ActivityNotificationContainer";
import { ActivityNotificationCampaignAddedAsTeamMember_ActivityNotificationCampaignAddedAsTeamMember$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationCampaignAddedAsTeamMember_ActivityNotificationCampaignAddedAsTeamMember.graphql";

const fragment = graphql`
  fragment ActivityNotificationCampaignAddedAsTeamMember_ActivityNotificationCampaignAddedAsTeamMember on ActivityNotificationCampaignAddedAsTeamMember {
    campaignInfo {
      title

      ...AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo
    }
    action {
      ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction
    }
    sender {
      username

      ProfilePhoto {
        photoUrl
      }
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationCampaignAddedAsTeamMember_ActivityNotificationCampaignAddedAsTeamMember$key;
};

export default function ActivityNotificationCampaignAddedAsTeamMember({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { campaignInfo, sender } = notificationData;

  return (
    <ActivityNotificationContainer
      actionButton={
        notificationData.action == null ? null : (
          <ActivityNotificationLinkActionButton
            action={notificationData.action}
          />
        )
      }
      profilePhotoInfo={{
        photoUrl: sender!.ProfilePhoto?.photoUrl,
        username: sender!.username,
      }}
      asset={
        <AssetForNotificationCampaignInfo
          activityNotificationCampaignInfo={campaignInfo}
        />
      }
      label={`You've been added as a team member to ${campaignInfo.title}!`}
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
