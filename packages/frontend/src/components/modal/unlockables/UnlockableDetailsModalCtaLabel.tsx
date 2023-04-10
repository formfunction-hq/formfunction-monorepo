import graphql from "babel-plugin-relay/macro";
import styles from "css/modal/unlockables/UnlockableInfoModalCtaLabel.module.css";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import { useFragment } from "react-relay";
import getUnlockableWinner from "utils/unlockables/getUnlockableWinner";
import useNftKind from "hooks/useNftKind";
import useUserContext from "hooks/useUserContext";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import useUnlockableModalContext from "hooks/useUnlockableModalContext";
import UnlockableModalType from "types/enums/UnlockableModalType";
import { UnlockableDetailsModalCtaLabel_MetadataAccount$key } from "components/modal/unlockables/__generated__/UnlockableDetailsModalCtaLabel_MetadataAccount.graphql";
import UsernameLink from "components/buttons/UsernameLink";

const fragment = graphql`
  fragment UnlockableDetailsModalCtaLabel_MetadataAccount on MetadataAccount {
    nft {
      Creator {
        id
        username
      }
    }

    unlockable {
      # Note: Keep in sync with useSettleSale Relay store update.
      unlockableWinners {
        hasBuyerDismissedShareInfoCta
        hasCreatorDismissedSeeInfoCta
        userEmail(input: $unlockableWinnerUserEmailInput)

        user {
          id
          username
        }
      }
    }

    ...useNftKind_MetadataAccount
  }
`;

type Props = {
  metadataAccount: UnlockableDetailsModalCtaLabel_MetadataAccount$key;
};

export default function UnlockableDetailsModalCtaLabel({
  metadataAccount,
}: Props) {
  const { setModalType, onHide } = useUnlockableModalContext();
  const { user } = useUserContext();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const nftKind = useNftKind(metadataAccountData);

  const {
    nft: { Creator },
    unlockable,
  } = metadataAccountData;

  if (unlockable == null) {
    return null;
  }

  const unlockableWinner = getUnlockableWinner(
    unlockable.unlockableWinners,
    nftKind
  );

  if (unlockableWinner == null || user == null || Creator == null) {
    return null;
  }

  const isUnlockableCreator = user.id === Creator.id;
  if (isUnlockableCreator && unlockableWinner.hasCreatorDismissedSeeInfoCta) {
    return (
      <Body1 className={styles.ctaLabel} colorClass={ColorClass.Primary}>
        <UsernameLink username={unlockableWinner.user.username} /> shared their
        info with you.{" "}
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
          display="inline"
          onClick={() => {
            onHide();
            setModalType(UnlockableModalType.SeeInfo);
          }}
        >
          See info
        </TextButton>
      </Body1>
    );
  }

  const isUnlockableWinner = user.id === unlockableWinner.user.id;
  const buyerDidNotProvideInfo = unlockableWinner.userEmail == null;
  if (
    isUnlockableWinner &&
    buyerDidNotProvideInfo &&
    unlockableWinner.hasBuyerDismissedShareInfoCta
  ) {
    return (
      <Body1 className={styles.ctaLabel} colorClass={ColorClass.Primary}>
        You declined to share your info with{" "}
        <UsernameLink username={Creator.username} />.{" "}
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
          display="inline"
          onClick={() => {
            onHide();
            setModalType(UnlockableModalType.ShareInfo);
          }}
        >
          Share your info
        </TextButton>
      </Body1>
    );
  }

  return null;
}
