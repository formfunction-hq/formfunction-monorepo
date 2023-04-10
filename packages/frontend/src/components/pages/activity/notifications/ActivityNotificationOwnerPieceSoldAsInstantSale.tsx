import graphql from "babel-plugin-relay/macro";
import ActivityNotificationContainer from "components/pages/activity/ActivityNotificationContainer";
import { ActivityNotificationOwnerPieceSoldAsInstantSale_ActivityNotificationOwnerPieceSoldAsInstantSale$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationOwnerPieceSoldAsInstantSale_ActivityNotificationOwnerPieceSoldAsInstantSale.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import UsernameLink from "components/buttons/UsernameLink";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import PriceWithSymbol from "components/price/PriceWithSymbol";

const fragment = graphql`
  fragment ActivityNotificationOwnerPieceSoldAsInstantSale_ActivityNotificationOwnerPieceSoldAsInstantSale on ActivityNotificationOwnerPieceSoldAsInstantSale {
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    price {
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
  notification: ActivityNotificationOwnerPieceSoldAsInstantSale_ActivityNotificationOwnerPieceSoldAsInstantSale$key;
};

export default function ActivityNotificationOwnerPieceSoldAsInstantSale({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo, sender } = notificationData;

  return (
    <ActivityNotificationContainer
      asset={<NftAssetForActivityNotificationNftInfo nftInfo={nftInfo} />}
      label={
        <>
          <UsernameLink username={sender!.username} /> bought{" "}
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} /> for{" "}
          <PriceWithSymbol
            display="inline"
            fontClass="inherit"
            price={notificationData.price}
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
