import graphql from "babel-plugin-relay/macro";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import ActivityNotificationLinkActionButton from "components/pages/activity/ActivityNotificationLinkActionButton";
import AssetForNotificationCampaignInfo from "components/assets/AssetForNotificationCampaignInfo";
import { ActivityNotificationCampaignFollowersCampaignPublished_ActivityNotificationCampaignFollowersCampaignPublished$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationCampaignFollowersCampaignPublished_ActivityNotificationCampaignFollowersCampaignPublished.graphql";
import ActivityNotificationContainer from "components/pages/activity/ActivityNotificationContainer";
import UsernameLink from "components/buttons/UsernameLink";

const fragment = graphql`
  fragment ActivityNotificationCampaignFollowersCampaignPublished_ActivityNotificationCampaignFollowersCampaignPublished on ActivityNotificationCampaignFollowersCampaignPublished {
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
  notification: ActivityNotificationCampaignFollowersCampaignPublished_ActivityNotificationCampaignFollowersCampaignPublished$key;
};

export default function ActivityNotificationCampaignFollowersCampaignPublished({
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
      label={
        <>
          <UsernameLink username={sender!.username} />
          &apos;s new campaign {campaignInfo.title} just went live!
        </>
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
