import graphql from "babel-plugin-relay/macro";
import { ActivityNotificationBidderAuctionExtended_ActivityNotificationBidderAuctionExtended$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationBidderAuctionExtended_ActivityNotificationBidderAuctionExtended.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";

const fragment = graphql`
  fragment ActivityNotificationBidderAuctionExtended_ActivityNotificationBidderAuctionExtended on ActivityNotificationBidderAuctionExtended {
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationBidderAuctionExtended_ActivityNotificationBidderAuctionExtended$key;
};

export default function ActivityNotificationBidderAuctionExtended({
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
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} /> has been
          extended due to Solana network issues
        </>
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
