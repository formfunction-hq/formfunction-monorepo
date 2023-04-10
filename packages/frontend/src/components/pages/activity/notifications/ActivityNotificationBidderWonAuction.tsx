import graphql from "babel-plugin-relay/macro";
import { ActivityNotificationBidderWonAuction_ActivityNotificationBidderWonAuction$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationBidderWonAuction_ActivityNotificationBidderWonAuction.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";

const fragment = graphql`
  fragment ActivityNotificationBidderWonAuction_ActivityNotificationBidderWonAuction on ActivityNotificationBidderWonAuction {
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationBidderWonAuction_ActivityNotificationBidderWonAuction$key;
};

export default function ActivityNotificationBidderWonAuction({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo } = notificationData;

  return (
    <SystemNotificationContainer
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          You won the auction for{" "}
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} />
        </>
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
