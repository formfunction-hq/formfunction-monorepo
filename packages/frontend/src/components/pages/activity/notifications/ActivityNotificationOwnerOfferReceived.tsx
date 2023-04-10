import graphql from "babel-plugin-relay/macro";
import ActivityNotificationContainer from "components/pages/activity/ActivityNotificationContainer";
import { ActivityNotificationOwnerOfferReceived_ActivityNotificationOwnerOfferReceived$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationOwnerOfferReceived_ActivityNotificationOwnerOfferReceived.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import UsernameLink from "components/buttons/UsernameLink";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import PriceWithSymbol from "components/price/PriceWithSymbol";
import ActivityNotificationLinkActionButton from "components/pages/activity/ActivityNotificationLinkActionButton";

const fragment = graphql`
  fragment ActivityNotificationOwnerOfferReceived_ActivityNotificationOwnerOfferReceived on ActivityNotificationOwnerOfferReceived {
    action {
      ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction
    }
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    offerPrice {
      ...PriceWithSymbol_Price
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
  notification: ActivityNotificationOwnerOfferReceived_ActivityNotificationOwnerOfferReceived$key;
};

export default function ActivityNotificationOwnerOfferReceived({
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
          You received an offer of{" "}
          <PriceWithSymbol
            display="inline"
            fontClass="inherit"
            price={notificationData.offerPrice}
          />{" "}
          from <UsernameLink username={sender!.username} /> for{" "}
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} />
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
