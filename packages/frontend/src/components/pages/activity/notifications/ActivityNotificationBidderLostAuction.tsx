import graphql from "babel-plugin-relay/macro";
import { ActivityNotificationBidderLostAuction_ActivityNotificationBidderLostAuction$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationBidderLostAuction_ActivityNotificationBidderLostAuction.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";

const fragment = graphql`
  fragment ActivityNotificationBidderLostAuction_ActivityNotificationBidderLostAuction on ActivityNotificationBidderLostAuction {
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationBidderLostAuction_ActivityNotificationBidderLostAuction$key;
};

export default function ActivityNotificationBidderLostAuction({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo } = notificationData;

  return (
    <SystemNotificationContainer
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          You lost the auction for{" "}
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} />
        </>
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
