import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  DismissUnlockableWinnerCreatorSeeInfoCtaInput,
  UpdateUnlockableWinnerResponse,
} from "src/__generated__/generated";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import convertUnlockableWinner from "src/utils/convert/convertUnlockableWinner";
import updateUnlockableWinner from "src/utils/prisma/updateUnlockableWinner";
import getPrisma from "src/utils/prisma/getPrisma";
import invariant from "tiny-invariant";

async function assertRequestUserIsUnlockableCreator(
  context: MyContext,
  input: DismissUnlockableWinnerCreatorSeeInfoCtaInput
) {
  const prisma = getPrisma();
  const unlockableWinner = await prisma.unlockableWinner.findUnique({
    include: {
      Unlockable: {
        include: {
          NftListing: {
            include: {
              Nft_NftToNftListing_nftId: true,
            },
          },
        },
      },
    },
    where: {
      unlockableId_userId: {
        unlockableId: input.unlockableId,
        userId: input.unlockableWinnerUserId,
      },
    },
  });

  const userId = assertUserSignedRequest(context).toString();
  const creatorId =
    unlockableWinner?.Unlockable.NftListing?.Nft_NftToNftListing_nftId
      .creatorId;

  invariant(
    creatorId === userId,
    `Request user must be the creator of the Unlockable, received creatorId: ${creatorId}, request userId: ${userId}`
  );
}

export default async function dismissUnlockableWinnerCreatorSeeInfoCtaResolver(
  context: MyContext,
  input: DismissUnlockableWinnerCreatorSeeInfoCtaInput
): Promise<UpdateUnlockableWinnerResponse> {
  await assertRequestUserIsUnlockableCreator(context, input);

  const unlockableWinner = await updateUnlockableWinner({
    data: {
      hasCreatorDismissedSeeInfoCta: true,
    },
    unlockableId: input.unlockableId,
    unlockableWinnerUserId: input.unlockableWinnerUserId,
  });

  return {
    __typename: Typename.UpdateUnlockableWinnerResponse,
    unlockableWinner: convertUnlockableWinner(unlockableWinner),
  };
}
