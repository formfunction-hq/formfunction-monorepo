import graphql from "babel-plugin-relay/macro";
import { ActivityNotificationBidderAuctionAlmostOver_ActivityNotificationBidderAuctionAlmostOver$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationBidderAuctionAlmostOver_ActivityNotificationBidderAuctionAlmostOver.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";

const fragment = graphql`
  fragment ActivityNotificationBidderAuctionAlmostOver_ActivityNotificationBidderAuctionAlmostOver on ActivityNotificationBidderAuctionAlmostOver {
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationBidderAuctionAlmostOver_ActivityNotificationBidderAuctionAlmostOver$key;
};

export default function ActivityNotificationBidderAuctionAlmostOver({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo } = notificationData;

  return (
    <SystemNotificationContainer
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          The auction for{" "}
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} /> is ending
          soon
        </>
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
