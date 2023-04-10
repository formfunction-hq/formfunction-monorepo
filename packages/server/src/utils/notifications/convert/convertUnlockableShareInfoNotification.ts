import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getActivityNotificationLinkActionForNft from "src/utils/notifications/actions/getActivityNotificationLinkActionForNft";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNft from "src/utils/notifications/getNotificationNftInfoFromNft";
import getPrisma from "src/utils/prisma/getPrisma";
import { ActivityNotificationUnlockableShareInfo } from "src/__generated__/generated";
import invariant from "tiny-invariant";

export default async function convertUnlockableShareInfoNotification(
  notification: ConvertActivityNotificationType
): Promise<ActivityNotificationUnlockableShareInfo> {
  const nft = notification.Nft;
  invariant(nft != null);

  const prisma = getPrisma();
  const unlockableWinner = await prisma.unlockableWinner.findFirst({
    where: {
      Unlockable: {
        NftListing: {
          nftId: nft.id,
        },
      },
      userId: notification.Notification.receiver!,
    },
  });
  invariant(unlockableWinner != null);
  const hasAction =
    unlockableWinner.userEmail == null &&
    !unlockableWinner.hasBuyerDismissedShareInfoCta;

  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationUnlockableShareInfo,
    action: !hasAction
      ? null
      : getActivityNotificationLinkActionForNft(
          nft,
          "Share info",
          notification.Notification.Sender!.username
        ),
    nftInfo: getNotificationNftInfoFromNft(nft),
  };
}
