import graphql from "babel-plugin-relay/macro";
import ActivityNotificationContainer from "components/pages/activity/ActivityNotificationContainer";
import { ActivityNotificationOwnerFirstBidReceived_ActivityNotificationOwnerFirstBidReceived$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationOwnerFirstBidReceived_ActivityNotificationOwnerFirstBidReceived.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import UsernameLink from "components/buttons/UsernameLink";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import PriceWithSymbol from "components/price/PriceWithSymbol";

const fragment = graphql`
  fragment ActivityNotificationOwnerFirstBidReceived_ActivityNotificationOwnerFirstBidReceived on ActivityNotificationOwnerFirstBidReceived {
    bidPrice {
      ...PriceWithSymbol_Price
    }
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    sender {
      username

      ProfilePhoto {
        photoUrl
      }
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationOwnerFirstBidReceived_ActivityNotificationOwnerFirstBidReceived$key;
};

export default function ActivityNotificationOwnerFirstBidReceived({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo, sender } = notificationData;

  return (
    <ActivityNotificationContainer
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          <UsernameLink username={sender!.username} /> placed the first bid on{" "}
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} /> for{" "}
          <PriceWithSymbol
            display="inline"
            fontClass="inherit"
            price={notificationData.bidPrice}
          />
        </>
      }
      profilePhotoInfo={{
        photoUrl: sender!.ProfilePhoto?.photoUrl,
        username: sender!.username,
      }}
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
