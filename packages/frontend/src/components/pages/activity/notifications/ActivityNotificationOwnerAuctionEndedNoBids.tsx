import graphql from "babel-plugin-relay/macro";
import { ActivityNotificationOwnerAuctionEndedNoBids_ActivityNotificationOwnerAuctionEndedNoBids$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationOwnerAuctionEndedNoBids_ActivityNotificationOwnerAuctionEndedNoBids.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";

const fragment = graphql`
  fragment ActivityNotificationOwnerAuctionEndedNoBids_ActivityNotificationOwnerAuctionEndedNoBids on ActivityNotificationOwnerAuctionEndedNoBids {
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationOwnerAuctionEndedNoBids_ActivityNotificationOwnerAuctionEndedNoBids$key;
};

export default function ActivityNotificationOwnerAuctionEndedNoBids({
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
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} /> ended
          without any bids, and the piece is now listed at the reserve price
        </>
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
