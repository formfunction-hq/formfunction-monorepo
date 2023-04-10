import graphql from "babel-plugin-relay/macro";
import { ActivityNotificationBuyerOfferExpired_ActivityNotificationBuyerOfferExpired$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationBuyerOfferExpired_ActivityNotificationBuyerOfferExpired.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";

const fragment = graphql`
  fragment ActivityNotificationBuyerOfferExpired_ActivityNotificationBuyerOfferExpired on ActivityNotificationBuyerOfferExpired {
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationBuyerOfferExpired_ActivityNotificationBuyerOfferExpired$key;
};

export default function ActivityNotificationBuyerOfferExpired({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo } = notificationData;

  return (
    <SystemNotificationContainer
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          Your offer for{" "}
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} /> expired
        </>
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
