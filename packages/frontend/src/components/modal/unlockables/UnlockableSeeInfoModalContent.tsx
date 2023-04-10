import graphql from "babel-plugin-relay/macro";
import styles from "css/modal/unlockables/UnlockableSenderModal.module.css";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import { useFragment, useMutation } from "react-relay";
import NftAsset from "components/images/NftAsset";
import NftAssetSize from "types/enums/NftAssetSize";
import getImgixUrl from "utils/getImgixUrl";
import getUnlockableWinner from "utils/unlockables/getUnlockableWinner";
import useNftKind from "hooks/useNftKind";
import TextButton from "components/buttons/TextButton";
import copyTextToClipboard from "utils/copyTextToClipboard";
import CopyIcon from "components/icons/CopyIcon";
import ColorValue from "types/enums/ColorValue";
import { notify } from "components/toast/notifications";
import TextButtonTheme from "types/enums/TextButtonTheme";
import useUnlockableModalContext from "hooks/useUnlockableModalContext";
import { UnlockableSeeInfoModalContent_MetadataAccount$key } from "components/modal/unlockables/__generated__/UnlockableSeeInfoModalContent_MetadataAccount.graphql";
import { UnlockableSeeInfoModalContentDismissSeeInfoCtaMutation } from "components/modal/unlockables/__generated__/UnlockableSeeInfoModalContentDismissSeeInfoCtaMutation.graphql";
import UsernameLink from "components/buttons/UsernameLink";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import useViewerId from "hooks/useViewerId";

const fragment = graphql`
  fragment UnlockableSeeInfoModalContent_MetadataAccount on MetadataAccount {
    data {
      name
    }

    unlockable {
      id

      asset {
        contentType
        path
      }

      # Note: Keep in sync with useSettleSale Relay store update.
      unlockableWinners {
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

const dismissSeeInfoCtaMutation = graphql`
  mutation UnlockableSeeInfoModalContentDismissSeeInfoCtaMutation(
    $input: DismissUnlockableWinnerCreatorSeeInfoCtaInput!
    $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!
  ) {
    dismissUnlockableWinnerCreatorSeeInfoCta(input: $input) {
      unlockableWinner {
        ...useUnlockableCtaType_UnlockableWinnerExpress
      }
    }
  }
`;

type Props = {
  metadataAccount: UnlockableSeeInfoModalContent_MetadataAccount$key;
};

export default function UnlockableSeeInfoModalContent({
  metadataAccount,
}: Props) {
  const viewerId = useViewerId();
  const { onHide } = useUnlockableModalContext();
  const [commitDismissSeeInfoCta, commitDismissSeeInfoCtaInFlight] =
    useMutation<UnlockableSeeInfoModalContentDismissSeeInfoCtaMutation>(
      dismissSeeInfoCtaMutation
    );

  const metadataAccountData = useFragment(fragment, metadataAccount);
  const nftKind = useNftKind(metadataAccountData);
  const {
    data: { name },
    unlockable,
  } = metadataAccountData;

  const unlockableWinner = getUnlockableWinner(
    metadataAccountData.unlockable?.unlockableWinners,
    nftKind
  );

  if (unlockable == null || unlockableWinner?.userEmail == null) {
    return null;
  }

  const {
    hasCreatorDismissedSeeInfoCta,
    user: { id: unlockableWinnerUserId, username },
    userEmail,
  } = unlockableWinner;

  return (
    <div className={styles.body}>
      <Body1 colorClass={ColorClass.Secondary}>
        <UsernameLink username={username} /> sent you their email for the
        unlockable for {name}.
      </Body1>
      <div className={styles.imageContainer}>
        <NftAsset
          assetSrc={getImgixUrl(unlockable.asset.path)}
          contentType={unlockable.asset.contentType}
          noBorderRadius
          playbackId={undefined}
          size={NftAssetSize.Size234}
        />
      </div>
      <Body1 colorClass={ColorClass.Primary}>Email:</Body1>
      <TextButton
        onClick={() => copyTextToClipboard(userEmail)}
        textDecoration="none"
      >
        <div className={styles.buyerEmail}>
          <Body1 colorClass={ColorClass.Primary}>{userEmail}</Body1>
          <CopyIcon colorValue={ColorValue.Secondary} />
        </div>
      </TextButton>
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        className={styles.button}
        fontClass={FontClass.NavLink}
        onClick={onHide}
      >
        OK
      </ButtonWithText>
      {!hasCreatorDismissedSeeInfoCta && (
        <TextButton
          buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
          className={styles.dismissButton}
          disabled={commitDismissSeeInfoCtaInFlight}
          fontClass={FontClass.Body1}
          onClick={() => {
            commitDismissSeeInfoCta({
              onCompleted: () => {
                notify({
                  message: "Dismissed - you won't see this again",
                  type: "success",
                });
                onHide();
              },
              onError: () => {
                notifyUnexpectedError();
              },
              variables: {
                input: {
                  unlockableId: unlockable.id,
                  unlockableWinnerUserId,
                },
                unlockableWinnerUserEmailInput: {
                  viewerId,
                },
              },
            });
          }}
        >
          Don&apos;t show again
        </TextButton>
      )}
    </div>
  );
}
