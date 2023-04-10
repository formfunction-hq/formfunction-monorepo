import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import Typename from "src/types/enums/Typename";
import getActivityNotificationLinkActionForNft from "src/utils/notifications/actions/getActivityNotificationLinkActionForNft";
import getIActivityNotificationFields from "src/utils/notifications/convert/getIActivityNotificationFields";
import getPrisma from "src/utils/prisma/getPrisma";
import { ActivityNotificationAirdropGiftReceived } from "src/__generated__/generated";
import invariant from "tiny-invariant";

export default async function convertAirdropGiftReceivedNotification(
  notification: ConvertActivityNotificationType,
  airdropId: string
): Promise<ActivityNotificationAirdropGiftReceived> {
  const prisma = getPrisma();
  const airdrop = await prisma.airdrop.findUnique({
    include: {
      StandardEditionNft: { include: { NftMetadata: true, Owner: true } },
    },
    where: { id: airdropId },
  });
  invariant(
    airdrop != null && airdrop.StandardEditionNft != null,
    `airdrop and StandardEditionNft must not be null for airdrop ID ${airdropId}!`
  );

  return {
    ...getIActivityNotificationFields(notification),
    __typename: Typename.ActivityNotificationAirdropGiftReceived,
    action: getActivityNotificationLinkActionForNft(
      airdrop.StandardEditionNft,
      "See gift",
      airdrop.StandardEditionNft.Owner.username
    ),
  };
}
