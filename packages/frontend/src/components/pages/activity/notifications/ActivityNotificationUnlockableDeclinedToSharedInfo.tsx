import graphql from "babel-plugin-relay/macro";
import ActivityNotificationContainer from "components/pages/activity/ActivityNotificationContainer";
import { ActivityNotificationUnlockableDeclinedToSharedInfo_ActivityNotificationUnlockableDeclinedToSharedInfo$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationUnlockableDeclinedToSharedInfo_ActivityNotificationUnlockableDeclinedToSharedInfo.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import UsernameLink from "components/buttons/UsernameLink";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";

const fragment = graphql`
  fragment ActivityNotificationUnlockableDeclinedToSharedInfo_ActivityNotificationUnlockableDeclinedToSharedInfo on ActivityNotificationUnlockableDeclinedToSharedInfo {
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
  notification: ActivityNotificationUnlockableDeclinedToSharedInfo_ActivityNotificationUnlockableDeclinedToSharedInfo$key;
};

export default function ActivityNotificationUnlockableDeclinedToSharedInfo({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo, sender } = notificationData;

  return (
    <ActivityNotificationContainer
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          <UsernameLink username={sender!.username} /> declined to share their
          info with you for the unlockable for{" "}
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
