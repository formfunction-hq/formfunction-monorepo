import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getActivityNotificationLinkActionForNft from "src/utils/notifications/actions/getActivityNotificationLinkActionForNft";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getNotificationNftInfoFromNft from "src/utils/notifications/getNotificationNftInfoFromNft";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  ActivityNotificationCollabRequest,
  RequestStatusExpress_Enum,
} from "src/__generated__/generated";
import invariant from "tiny-invariant";

export default async function convertCollabRequestNotification(
  notification: ConvertActivityNotificationType
): Promise<ActivityNotificationCollabRequest> {
  const nft = notification.Nft;
  invariant(nft != null);
  const prisma = getPrisma();
  const collabRequest = await prisma.request.findFirst({
    where: {
      NftToCollaborator: {
        nftId: notification.nftId!,
      },
      toUserId: notification.Notification.receiver!,
    },
  });
  invariant(collabRequest != null);

  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationCollabRequest,
    action:
      collabRequest.status !== RequestStatusExpress_Enum.Pending
        ? null
        : getActivityNotificationLinkActionForNft(
            nft,
            "Accept",
            notification.Notification.Sender!.username
          ),
    nftInfo: getNotificationNftInfoFromNft(nft),
  };
}
