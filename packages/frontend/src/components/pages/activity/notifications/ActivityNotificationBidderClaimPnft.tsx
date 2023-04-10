import graphql from "babel-plugin-relay/macro";
import { ActivityNotificationBidderClaimPnft_ActivityNotificationBidderClaimPnft$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationBidderClaimPnft_ActivityNotificationBidderClaimPnft.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";
import ActivityNotificationLinkActionButton from "components/pages/activity/ActivityNotificationLinkActionButton";

const fragment = graphql`
  fragment ActivityNotificationBidderClaimPnft_ActivityNotificationBidderClaimPnft on ActivityNotificationBidderClaimPnft {
    action {
      ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction
    }
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationBidderClaimPnft_ActivityNotificationBidderClaimPnft$key;
};

export default function ActivityNotificationBidderClaimPnft({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo } = notificationData;

  return (
    <SystemNotificationContainer
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
          You can now claim the participation NFT for{" "}
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} />
        </>
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
