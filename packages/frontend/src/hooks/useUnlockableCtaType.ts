import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import useUserContext from "hooks/useUserContext";
import { useUnlockableCtaType_MetadataAccount$key } from "hooks/__generated__/useUnlockableCtaType_MetadataAccount.graphql";
import { useUnlockableCtaType_UnlockableWinnerExpress$key } from "hooks/__generated__/useUnlockableCtaType_UnlockableWinnerExpress.graphql";
import UnlockableCta from "types/enums/UnlockableCta";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

const nftFragment = graphql`
  fragment useUnlockableCtaType_MetadataAccount on MetadataAccount {
    nft {
      creatorId
    }
  }
`;

const unlockableWinnerFragment = graphql`
  # Note: Keep in sync with useSettleSale Relay store update.
  fragment useUnlockableCtaType_UnlockableWinnerExpress on UnlockableWinnerExpress {
    hasBuyerDismissedShareInfoCta
    hasCreatorDismissedSeeInfoCta
    userEmail(input: $unlockableWinnerUserEmailInput)
    userId
  }
`;

export default function useUnlockableCtaType(
  metadataAccount: useUnlockableCtaType_MetadataAccount$key,
  unlockableWinner: Maybe<useUnlockableCtaType_UnlockableWinnerExpress$key>
) {
  const { user } = useUserContext();
  const nftMetadataAccountData = useFragment(nftFragment, metadataAccount);
  const unlockableWinnerData = useFragment(
    unlockableWinnerFragment,
    unlockableWinner
  );

  if (unlockableWinnerData == null) {
    return null;
  }

  const {
    nft: { creatorId },
  } = nftMetadataAccountData;

  if (user?.id === creatorId) {
    if (unlockableWinnerData.hasCreatorDismissedSeeInfoCta) {
      return null;
    }

    const winnerNeedsToProvideInfo = unlockableWinnerData.userEmail == null;
    if (winnerNeedsToProvideInfo) {
      return null;
    }

    return UnlockableCta.SeeInfo;
  }

  if (user?.id === unlockableWinnerData.userId) {
    if (unlockableWinnerData.hasBuyerDismissedShareInfoCta) {
      return null;
    }

    const needsToProvideInfo = unlockableWinnerData.userEmail == null;
    if (needsToProvideInfo) {
      return UnlockableCta.ShareInfo;
    }
  }

  return null;
}
