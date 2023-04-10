import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  NotificationTypeExpress_Enum,
  UpdateUnlockableWinnerBuyerInfoInput,
  UpdateUnlockableWinnerResponse,
} from "src/__generated__/generated";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import convertUnlockableWinner from "src/utils/convert/convertUnlockableWinner";
import updateUnlockableWinner from "src/utils/prisma/updateUnlockableWinner";
import createNotificationForUnlockableCreator from "src/utils/unlockables/createNotificationForUnlockableCreator";
import isValidEmail from "formfn-shared/dist/utils/validation/isValidEmail";

export default async function updateUnlockableWinnerBuyerInfoResolver(
  context: MyContext,
  input: UpdateUnlockableWinnerBuyerInfoInput
): Promise<UpdateUnlockableWinnerResponse> {
  const { userEmail } = input;

  if (!isValidEmail(userEmail)) {
    throw new Error(
      `userEmail input must be a valid email address, received: ${userEmail}`
    );
  }

  const unlockableWinner = await updateUnlockableWinner({
    data: { userEmail },
    unlockableId: input.unlockableId,
    unlockableWinnerUserId: assertUserSignedRequest(context).toString(),
  });

  await createNotificationForUnlockableCreator(
    unlockableWinner,
    NotificationTypeExpress_Enum.UnlockableInfoShared
  );

  return {
    __typename: Typename.UpdateUnlockableWinnerResponse,
    unlockableWinner: convertUnlockableWinner(unlockableWinner),
  };
}
