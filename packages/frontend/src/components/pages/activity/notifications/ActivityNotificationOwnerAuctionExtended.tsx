import graphql from "babel-plugin-relay/macro";
import { ActivityNotificationOwnerAuctionExtended_ActivityNotificationOwnerAuctionExtended$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationOwnerAuctionExtended_ActivityNotificationOwnerAuctionExtended.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";

const fragment = graphql`
  fragment ActivityNotificationOwnerAuctionExtended_ActivityNotificationOwnerAuctionExtended on ActivityNotificationOwnerAuctionExtended {
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationOwnerAuctionExtended_ActivityNotificationOwnerAuctionExtended$key;
};

export default function ActivityNotificationOwnerAuctionExtended({
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
