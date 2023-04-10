import graphql from "babel-plugin-relay/macro";
import ActivityNotificationContainer from "components/pages/activity/ActivityNotificationContainer";
import { ActivityNotificationFollowerNewPieceScheduled_ActivityNotificationFollowerNewPieceScheduled$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationFollowerNewPieceScheduled_ActivityNotificationFollowerNewPieceScheduled.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import UsernameLink from "components/buttons/UsernameLink";

const fragment = graphql`
  fragment ActivityNotificationFollowerNewPieceScheduled_ActivityNotificationFollowerNewPieceScheduled on ActivityNotificationFollowerNewPieceScheduled {
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
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
  notification: ActivityNotificationFollowerNewPieceScheduled_ActivityNotificationFollowerNewPieceScheduled$key;
};

export default function ActivityNotificationFollowerNewPieceScheduled({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo, sender } = notificationData;

  return (
    <ActivityNotificationContainer
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          <UsernameLink username={sender!.username} /> scheduled a new auction
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
