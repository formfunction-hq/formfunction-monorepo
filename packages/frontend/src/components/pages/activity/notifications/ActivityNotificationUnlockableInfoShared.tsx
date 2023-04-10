import graphql from "babel-plugin-relay/macro";
import ActivityNotificationContainer from "components/pages/activity/ActivityNotificationContainer";
import { ActivityNotificationUnlockableInfoShared_ActivityNotificationUnlockableInfoShared$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationUnlockableInfoShared_ActivityNotificationUnlockableInfoShared.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import UsernameLink from "components/buttons/UsernameLink";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";

const fragment = graphql`
  fragment ActivityNotificationUnlockableInfoShared_ActivityNotificationUnlockableInfoShared on ActivityNotificationUnlockableInfoShared {
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
  notification: ActivityNotificationUnlockableInfoShared_ActivityNotificationUnlockableInfoShared$key;
};

export default function ActivityNotificationUnlockableInfoShared({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo, sender } = notificationData;

  return (
    <ActivityNotificationContainer
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          <UsernameLink username={sender!.username} /> shared their info with
          you for the unlockable for{" "}
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
