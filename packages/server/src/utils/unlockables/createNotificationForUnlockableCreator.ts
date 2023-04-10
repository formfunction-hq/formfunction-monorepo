import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import invariant from "tiny-invariant";
import { UpdateUnlockableWinnerPrismaResult } from "src/utils/prisma/updateUnlockableWinner";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import createUnlockableDeclinedToSharedInfoNotification from "src/utils/notifications/create/createUnlockableDeclinedToSharedInfoNotification";
import createUnlockableInfoSharedNotification from "src/utils/notifications/create/createUnlockableInfoSharedNotification";

export default async function createNotificationForUnlockableCreator(
  unlockableWinner: UpdateUnlockableWinnerPrismaResult,
  notificationType:
    | NotificationTypeExpress_Enum.UnlockableDeclinedToSharedInfo
    | NotificationTypeExpress_Enum.UnlockableInfoShared
): Promise<void> {
  invariant(
    unlockableWinner.Unlockable.NftListing != null,
    "unlockableWinner.Unlockable.NftListing cannot be null"
  );

  const { Creator, NftMetadata } =
    unlockableWinner.Unlockable.NftListing.Nft_NftToNftListing_nftId;

  switch (notificationType) {
    case NotificationTypeExpress_Enum.UnlockableDeclinedToSharedInfo:
      await createUnlockableDeclinedToSharedInfoNotification(
        {
          nftMint: NftMetadata.mint,
        },
        Creator.id,
        unlockableWinner.User.id
      );
      return;
    case NotificationTypeExpress_Enum.UnlockableInfoShared: {
      await createUnlockableInfoSharedNotification(
        {
          nftMint: NftMetadata.mint,
        },
        Creator.id,
        unlockableWinner.User.id
      );
      return;
    }
    default:
      assertUnreachable(notificationType);
  }
}
