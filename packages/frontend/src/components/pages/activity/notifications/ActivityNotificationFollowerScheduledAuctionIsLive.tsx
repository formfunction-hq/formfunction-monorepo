import graphql from "babel-plugin-relay/macro";
import ActivityNotificationContainer from "components/pages/activity/ActivityNotificationContainer";
import { ActivityNotificationFollowerScheduledAuctionIsLive_ActivityNotificationFollowerScheduledAuctionIsLive$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationFollowerScheduledAuctionIsLive_ActivityNotificationFollowerScheduledAuctionIsLive.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import UsernameLink from "components/buttons/UsernameLink";

const fragment = graphql`
  fragment ActivityNotificationFollowerScheduledAuctionIsLive_ActivityNotificationFollowerScheduledAuctionIsLive on ActivityNotificationFollowerScheduledAuctionIsLive {
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
  notification: ActivityNotificationFollowerScheduledAuctionIsLive_ActivityNotificationFollowerScheduledAuctionIsLive$key;
};

export default function ActivityNotificationFollowerScheduledAuctionIsLive({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo, sender } = notificationData;

  return (
    <ActivityNotificationContainer
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          <UsernameLink username={sender!.username} />
          &apos;s scheduled auction is live
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
