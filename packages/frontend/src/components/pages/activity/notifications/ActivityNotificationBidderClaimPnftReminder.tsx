import graphql from "babel-plugin-relay/macro";
import { ActivityNotificationBidderClaimPnftReminder_ActivityNotificationBidderClaimPnftReminder$key } from "components/pages/activity/notifications/__generated__/ActivityNotificationBidderClaimPnftReminder_ActivityNotificationBidderClaimPnftReminder.graphql";
import dayjs from "utils/dates/dayjsex";
import { useFragment } from "react-relay";
import NftAssetForActivityNotificationNftInfo from "components/images/NftAssetForActivityNotificationNftInfo";
import NftLinkForActivityNotificationNftInfo from "components/buttons/NftLinkForActivityNotificationNftInfo";
import SystemNotificationContainer from "components/pages/activity/SystemNotificationContainer";
import ActivityNotificationLinkActionButton from "components/pages/activity/ActivityNotificationLinkActionButton";
import pluralize from "formfn-shared/dist/utils/pluralize";

const fragment = graphql`
  fragment ActivityNotificationBidderClaimPnftReminder_ActivityNotificationBidderClaimPnftReminder on ActivityNotificationBidderClaimPnftReminder {
    action {
      ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction
    }
    nftInfo {
      ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo
      ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo
    }
    pnftCloseDate
    timeCreated
  }
`;

type Props = {
  notification: ActivityNotificationBidderClaimPnftReminder_ActivityNotificationBidderClaimPnftReminder$key;
};

export default function ActivityNotificationBidderClaimPnftReminder({
  notification,
}: Props) {
  const notificationData = useFragment(fragment, notification);
  const { nftInfo } = notificationData;

  const daysLeft = dayjs(notificationData.pnftCloseDate).diff(
    dayjs(notificationData.timeCreated),
    "day"
  );
  const daysLeftString =
    daysLeft < 1
      ? "less than 1 day"
      : `${daysLeft} ${pluralize("day", daysLeft)}`;

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
          You have {daysLeftString} left to claim the participation NFT for{" "}
          <NftLinkForActivityNotificationNftInfo nftInfo={nftInfo} />
        </>
      }
      timestamp={dayjs(notificationData.timeCreated)}
    />
  );
}
