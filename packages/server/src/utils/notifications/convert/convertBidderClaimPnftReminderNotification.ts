import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import dayjs from "src/utils/dates/dayjsex";
import getPnftDropTimes from "src/utils/getPnftDropTimes";
import getActivityNotificationLinkActionForNft from "src/utils/notifications/actions/getActivityNotificationLinkActionForNft";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNft from "src/utils/notifications/getNotificationNftInfoFromNft";
import hasUserClaimedPnft from "src/utils/pnft/hasUserClaimedPnft";
import isPnftDropClosed from "src/utils/pnft/isPnftDropClosed";
import { ActivityNotificationBidderClaimPnftReminder } from "src/__generated__/generated";
import invariant from "tiny-invariant";

export default async function convertBidderClaimPnftReminderNotification(
  notification: ConvertActivityNotificationType
): Promise<ActivityNotificationBidderClaimPnftReminder> {
  const nft = notification.Nft;
  invariant(nft != null);
  const { dropDuration } = await getPnftDropTimes();

  const [isDropClosed, hasClaimed] = await Promise.all([
    isPnftDropClosed(nft.mint),
    hasUserClaimedPnft(nft.mint, notification.Notification.receiver!),
  ]);

  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationBidderClaimPnftReminder,
    action:
      hasClaimed || isDropClosed
        ? null
        : getActivityNotificationLinkActionForNft(
            nft,
            "Claim NFT",
            notification.Notification.Sender!.username
          ),
    nftInfo: getNotificationNftInfoFromNft(nft),
    // Assumes that the notification gets created once there is dropDuration time left to claim.
    pnftCloseDate: dayjs(notification.timeCreated).add(dropDuration).toDate(),
  };
}
