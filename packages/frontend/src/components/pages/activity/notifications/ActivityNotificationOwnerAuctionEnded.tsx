import graphql from "babel-plugin-relay/macro";
import ActivityNotificationContainer from "components/pages/activity/ActivityNotificationContainer";
import { ActivityNotificationOwnerAuctionEnded_ActivityNotificationOwnerAuctionEnded$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationOwnerAuctionEnded_ActivityNotificationOwnerAuctionEnded.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import UsernameLink from "components/buttons/UsernameLink";
import PriceWithSymbol from "components/price/PriceWithSymbol";
import ActivityNotificationLinkActionButton from "components/pages/activity/ActivityNotificationLinkActionButton";

const fragment = graphql`
  fragment ActivityNotificationOwnerAuctionEnded_ActivityNotificationOwnerAuctionEnded on ActivityNotificationOwnerAuctionEnded {
    action {
      ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction
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
    winningPrice {
      ...PriceWithSymbol_Price
    }
  }
`;

type Props = {
  notification: ActivityNotificationOwnerAuctionEnded_ActivityNotificationOwnerAuctionEnded$key;
};

export default function ActivityNotificationOwnerAuctionEnded({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo, sender } = notificationData;

  return (
    <ActivityNotificationContainer
      actionButton={
        notificationData.action == null ? null : (
          <ActivityNotificationLinkActionButton
            action={notificationData.action}
          />
        )
      }
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          <UsernameLink username={sender!.username} /> won the auction on{" "}
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} /> for{" "}
          <PriceWithSymbol
            display="inline"
            fontClass="inherit"
            price={notificationData.winningPrice}
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
