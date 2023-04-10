import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import MyContext from "src/types/MyContext";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  UnlockableWinnerExpress,
  UnlockableWinnerUserEmailInput,
} from "src/__generated__/generated";

/**
 * Privacy field resolver for UnlockableWinner.userEmail.
 *
 * Only the unlockable creator or winner can read this field.
 */
export default async function unlockableWinnerUserEmailResolver(
  context: MyContext,
  unlockableWinner: UnlockableWinnerExpress,
  input: MaybeUndef<UnlockableWinnerUserEmailInput>
): Promise<Maybe<string>> {
  const prisma = getPrisma();

  const unlockable = await prisma.unlockable.findFirst({
    include: {
      NftListing: {
        include: {
          Nft_NftToNftListing_nftId: true,
        },
      },
      UnlockableWinner: true,
    },
    where: {
      UnlockableWinner: {
        some: {
          id: unlockableWinner.id,
        },
      },
    },
  });

  const unlockableCreatorId =
    unlockable?.NftListing?.Nft_NftToNftListing_nftId.creatorId;

  const viewerId = context.verifiedPublicKey?.toString();
  const inputViewerId = input?.viewerId;

  if (
    unlockableCreatorId == null ||
    viewerId == null ||
    // TODO[@arcticmatt]: switch to invariant. This is just for backwards
    // compatibility.
    (inputViewerId != null && inputViewerId !== viewerId)
  ) {
    return null;
  }

  const isCreator = unlockableCreatorId === viewerId;
  const isUnlockableWinner = viewerId === unlockableWinner.userId;
  const canView = isCreator || isUnlockableWinner;

  if (!canView) {
    return null;
  }

  const unlockableWinnerEmail = unlockable?.UnlockableWinner.find(
    (val) => val.id === unlockableWinner.id
  )?.userEmail;

  return unlockableWinnerEmail ?? null;
}
