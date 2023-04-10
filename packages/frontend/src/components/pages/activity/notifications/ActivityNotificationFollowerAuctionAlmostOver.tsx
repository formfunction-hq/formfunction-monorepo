import graphql from "babel-plugin-relay/macro";
import { ActivityNotificationFollowerAuctionAlmostOver_ActivityNotificationFollowerAuctionAlmostOver$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationFollowerAuctionAlmostOver_ActivityNotificationFollowerAuctionAlmostOver.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import UsernameLink from "components/buttons/UsernameLink";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";

const fragment = graphql`
  fragment ActivityNotificationFollowerAuctionAlmostOver_ActivityNotificationFollowerAuctionAlmostOver on ActivityNotificationFollowerAuctionAlmostOver {
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    sender {
      username
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationFollowerAuctionAlmostOver_ActivityNotificationFollowerAuctionAlmostOver$key;
};

export default function ActivityNotificationFollowerAuctionAlmostOver({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo, sender } = notificationData;

  return (
    <SystemNotificationContainer
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          The auction for{" "}
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} /> by{" "}
          <UsernameLink username={sender!.username} /> is ending soon
        </>
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
