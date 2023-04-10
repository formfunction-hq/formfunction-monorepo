import graphql from "babel-plugin-relay/macro";
import { ActivityNotificationBidderOutbid_ActivityNotificationBidderOutbid$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationBidderOutbid_ActivityNotificationBidderOutbid.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";
import PriceWithSymbol from "components/price/PriceWithSymbol";

const fragment = graphql`
  fragment ActivityNotificationBidderOutbid_ActivityNotificationBidderOutbid on ActivityNotificationBidderOutbid {
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    refundAmount {
      ...PriceWithSymbol_Price
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationBidderOutbid_ActivityNotificationBidderOutbid$key;
};

export default function ActivityNotificationBidderOutbid({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo } = notificationData;

  return (
    <SystemNotificationContainer
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          You were outbid on{" "}
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} /> and you
          have been refunded{" "}
          <PriceWithSymbol
            display="inline"
            fontClass="inherit"
            price={notificationData.refundAmount}
          />
        </>
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
