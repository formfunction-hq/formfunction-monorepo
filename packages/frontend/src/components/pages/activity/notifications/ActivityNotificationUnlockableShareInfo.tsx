import graphql from "babel-plugin-relay/macro";
import ActivityNotificationContainer from "components/pages/activity/ActivityNotificationContainer";
import { ActivityNotificationUnlockableShareInfo_ActivityNotificationUnlockableShareInfo$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationUnlockableShareInfo_ActivityNotificationUnlockableShareInfo.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import UsernameLink from "components/buttons/UsernameLink";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import ActivityNotificationLinkActionButton from "components/pages/activity/ActivityNotificationLinkActionButton";

const fragment = graphql`
  fragment ActivityNotificationUnlockableShareInfo_ActivityNotificationUnlockableShareInfo on ActivityNotificationUnlockableShareInfo {
    action {
      ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction
    }
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
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
  notification: ActivityNotificationUnlockableShareInfo_ActivityNotificationUnlockableShareInfo$key;
};

export default function ActivityNotificationUnlockableShareInfo({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo, sender } = notificationData;

  return (
    <ActivityNotificationContainer
      actionButton={
        notificationData.action == null ? null : (
          <ActivityNotificationLinkActionButton
            action={notificationData.action}
          />
        )
      }
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          <UsernameLink username={sender!.username} /> requested info from you{" "}
          so they can send you the unlockable for{" "}
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} />
        </>
      }
      profilePhotoInfo={{
        photoUrl: sender!.ProfilePhoto?.photoUrl,
        username: sender!.username,
      }}
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
