import graphql from "babel-plugin-relay/macro";
import ActivityNotificationContainer from "components/pages/activity/ActivityNotificationContainer";
import { ActivityNotificationFollowerNewPieceListedSecondary_ActivityNotificationFollowerNewPieceListedSecondary$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationFollowerNewPieceListedSecondary_ActivityNotificationFollowerNewPieceListedSecondary.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import UsernameLink from "components/buttons/UsernameLink";

const fragment = graphql`
  fragment ActivityNotificationFollowerNewPieceListedSecondary_ActivityNotificationFollowerNewPieceListedSecondary on ActivityNotificationFollowerNewPieceListedSecondary {
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
  notification: ActivityNotificationFollowerNewPieceListedSecondary_ActivityNotificationFollowerNewPieceListedSecondary$key;
};

export default function ActivityNotificationFollowerNewPieceListedSecondary({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo, sender } = notificationData;

  return (
    <ActivityNotificationContainer
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          <UsernameLink username={sender!.username} /> has a new piece listed as
          a secondary sale
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
