import Typename from "src/types/enums/Typename";
import { UnlockableWinnerExpress } from "src/__generated__/generated";
import convertUser from "src/utils/convert/convertUser";
import ConvertUnlockableWinnerType from "src/types/convert/ConvertUnlockableWinnerType";

export default function convertUnlockableWinner(
  prismaUnlockableWinner: ConvertUnlockableWinnerType
): UnlockableWinnerExpress {
  return {
    __typename: Typename.UnlockableWinner,
    hasBuyerDismissedShareInfoCta:
      prismaUnlockableWinner.hasBuyerDismissedShareInfoCta,
    hasCreatorDismissedSeeInfoCta:
      prismaUnlockableWinner.hasCreatorDismissedSeeInfoCta,
    hasUserDismissedPromptToShareInfo: false,
    id: prismaUnlockableWinner.id,
    timeCreated: prismaUnlockableWinner.timeCreated,
    user: convertUser(prismaUnlockableWinner.User),
    userId: prismaUnlockableWinner.userId,
  };
}
