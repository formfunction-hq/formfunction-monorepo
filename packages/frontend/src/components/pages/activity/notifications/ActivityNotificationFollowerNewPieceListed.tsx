import graphql from "babel-plugin-relay/macro";
import ActivityNotificationContainer from "components/pages/activity/ActivityNotificationContainer";
import { ActivityNotificationFollowerNewPieceListed_ActivityNotificationFollowerNewPieceListed$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationFollowerNewPieceListed_ActivityNotificationFollowerNewPieceListed.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import UsernameLink from "components/buttons/UsernameLink";

const fragment = graphql`
  fragment ActivityNotificationFollowerNewPieceListed_ActivityNotificationFollowerNewPieceListed on ActivityNotificationFollowerNewPieceListed {
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
  notification: ActivityNotificationFollowerNewPieceListed_ActivityNotificationFollowerNewPieceListed$key;
};

export default function ActivityNotificationFollowerNewPieceListed({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo, sender } = notificationData;

  return (
    <ActivityNotificationContainer
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          <UsernameLink username={sender!.username} /> listed a new piece
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
