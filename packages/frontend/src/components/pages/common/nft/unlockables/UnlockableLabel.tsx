import styles from "css/pages/common/nft/unlockables/UnlockableLabel.module.css";
import graphql from "babel-plugin-relay/macro";
import CheckmarkGradientIcon from "components/icons/CheckmarkGradientIcon";
import { UnlockableLabel_MetadataAccount$key } from "components/pages/common/nft/unlockables/__generated__/UnlockableLabel_MetadataAccount.graphql";
import { UnlockableLabel_UnlockableWinnerExpress$key } from "components/pages/common/nft/unlockables/__generated__/UnlockableLabel_UnlockableWinnerExpress.graphql";
import Body2 from "components/text/Body2";
import useUserContext from "hooks/useUserContext";
import { useFragment } from "react-relay";
import ColorClass from "types/enums/ColorClass";
import UsernameLink from "components/buttons/UsernameLink";

const nftFragment = graphql`
  fragment UnlockableLabel_MetadataAccount on MetadataAccount {
    data {
      name
    }

    nft {
      creatorId

      Creator {
        username
      }
    }
  }
`;

const unlockableWinnerFragment = graphql`
  # Note: Keep in sync with useSettleSale Relay store update.
  fragment UnlockableLabel_UnlockableWinnerExpress on UnlockableWinnerExpress {
    hasBuyerDismissedShareInfoCta
    userEmail(input: $unlockableWinnerUserEmailInput)
    userId
  }
`;

type Props = {
  metadataAccount: UnlockableLabel_MetadataAccount$key;
  unlockableWinner: UnlockableLabel_UnlockableWinnerExpress$key;
};

export default function UnlockableLabel({
  metadataAccount,
  unlockableWinner,
}: Props) {
  const { user } = useUserContext();
  const nftMetadataAccountData = useFragment(nftFragment, metadataAccount);
  const unlockableWinnersData = useFragment(
    unlockableWinnerFragment,
    unlockableWinner
  );

  const {
    nft: { creatorId, Creator },
    data: { name },
  } = nftMetadataAccountData;

  const needsToProvideInfo = unlockableWinnersData?.userEmail == null;
  const declinedToProvideInfo =
    unlockableWinnersData?.hasBuyerDismissedShareInfoCta;

  if (user?.id === creatorId) {
    if (!needsToProvideInfo) {
      return (
        <Body2 colorClass={ColorClass.Secondary}>
          The buyer of this NFT has shared their email with you for the
          unlockable.
        </Body2>
      );
    }

    if (declinedToProvideInfo === true) {
      return (
        <Body2 colorClass={ColorClass.Secondary}>
          The buyer declined to provide their contact info.
        </Body2>
      );
    }

    return (
      <Body2 colorClass={ColorClass.Secondary}>
        The buyer of this NFT has not shared their email with you for the
        unlockable yet.
      </Body2>
    );
  }

  if (user?.id === unlockableWinnersData.userId) {
    const { username: creatorUsername } = Creator!;

    if (!needsToProvideInfo) {
      return (
        <div className={styles.infoSharedRow}>
          <CheckmarkGradientIcon />
          <Body2 colorClass={ColorClass.Secondary}>
            The email you entered has been shared with{" "}
            <UsernameLink username={creatorUsername} />.
          </Body2>
        </div>
      );
    }

    if (needsToProvideInfo && !declinedToProvideInfo) {
      return (
        <Body2 colorClass={ColorClass.Secondary}>
          <UsernameLink username={creatorUsername} /> has requested info from
          you so they can send you the unlockable for {name}.
        </Body2>
      );
    }
  }

  return (
    <Body2 colorClass={ColorClass.Secondary}>
      An unlockable was attached to the primary sale of this piece.
    </Body2>
  );
}
