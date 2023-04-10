import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  DismissUnlockableWinnerBuyerShareInfoCtaInput,
  NotificationTypeExpress_Enum,
  UpdateUnlockableWinnerResponse,
} from "src/__generated__/generated";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import convertUnlockableWinner from "src/utils/convert/convertUnlockableWinner";
import updateUnlockableWinner from "src/utils/prisma/updateUnlockableWinner";
import createNotificationForUnlockableCreator from "src/utils/unlockables/createNotificationForUnlockableCreator";

export default async function dismissUnlockableWinnerBuyerShareInfoCtaResolver(
  context: MyContext,
  input: DismissUnlockableWinnerBuyerShareInfoCtaInput
): Promise<UpdateUnlockableWinnerResponse> {
  const unlockableWinner = await updateUnlockableWinner({
    data: {
      hasBuyerDismissedShareInfoCta: true,
    },
    unlockableId: input.unlockableId,
    unlockableWinnerUserId: assertUserSignedRequest(context).toString(),
  });

  await createNotificationForUnlockableCreator(
    unlockableWinner,
    NotificationTypeExpress_Enum.UnlockableDeclinedToSharedInfo
  );

  return {
    __typename: Typename.UpdateUnlockableWinnerResponse,
    unlockableWinner: convertUnlockableWinner(unlockableWinner),
  };
}
