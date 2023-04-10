import graphql from "babel-plugin-relay/macro";
import { ActivityNotificationOwnerAuctionSettled_ActivityNotificationOwnerAuctionSettled$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationOwnerAuctionSettled_ActivityNotificationOwnerAuctionSettled.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";

const fragment = graphql`
  fragment ActivityNotificationOwnerAuctionSettled_ActivityNotificationOwnerAuctionSettled on ActivityNotificationOwnerAuctionSettled {
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationOwnerAuctionSettled_ActivityNotificationOwnerAuctionSettled$key;
};

export default function ActivityNotificationOwnerAuctionSettled({
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
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} /> was
          automatically settled for you
        </>
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
