import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getActivityNotificationLinkActionForNft from "src/utils/notifications/actions/getActivityNotificationLinkActionForNft";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNft from "src/utils/notifications/getNotificationNftInfoFromNft";
import hasUserClaimedPnft from "src/utils/pnft/hasUserClaimedPnft";
import isPnftDropClosed from "src/utils/pnft/isPnftDropClosed";
import { ActivityNotificationBidderClaimPnft } from "src/__generated__/generated";
import invariant from "tiny-invariant";

export default async function convertBidderClaimPnftNotification(
  notification: ConvertActivityNotificationType
): Promise<ActivityNotificationBidderClaimPnft> {
  const nft = notification.Nft;
  invariant(nft != null);

  const [isDropClosed, hasClaimed] = await Promise.all([
    isPnftDropClosed(nft.mint),
    hasUserClaimedPnft(nft.mint, notification.Notification.receiver!),
  ]);

  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationBidderClaimPnft,
    action:
      hasClaimed || isDropClosed
        ? null
        : getActivityNotificationLinkActionForNft(
            nft,
            "Claim NFT",
            notification.Notification.Sender!.username
          ),
    nftInfo: getNotificationNftInfoFromNft(nft),
  };
}
