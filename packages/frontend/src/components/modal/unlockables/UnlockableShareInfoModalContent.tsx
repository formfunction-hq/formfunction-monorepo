import graphql from "babel-plugin-relay/macro";
import styles from "css/modal/unlockables/UnlockableShareInfoModalContent.module.css";
import { useState } from "react";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import Body1 from "components/text/Body1";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import TextInput from "components/input/TextInput";
import { MAX_EMAIL_LENGTH } from "constants/MaxLengths";
import isValidEmail from "formfn-shared/dist/utils/validation/isValidEmail";
import CheckboxButtonWithLabel from "components/buttons/CheckboxButtonWithLabel";
import ColorClass from "types/enums/ColorClass";
import ErrorMessage from "components/text/ErrorMessage";
import { useFragment, useMutation } from "react-relay";
import useUserContext from "hooks/useUserContext";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import { notify } from "components/toast/notifications";
import useUnlockableModalContext from "hooks/useUnlockableModalContext";
import getUnlockableWinner from "utils/unlockables/getUnlockableWinner";
import useNftKind from "hooks/useNftKind";
import { UnlockableShareInfoModalContent_MetadataAccount$key } from "components/modal/unlockables/__generated__/UnlockableShareInfoModalContent_MetadataAccount.graphql";
import { UnlockableShareInfoModalContentUpdateBuyerInfoMutation } from "components/modal/unlockables/__generated__/UnlockableShareInfoModalContentUpdateBuyerInfoMutation.graphql";
import { UnlockableShareInfoModalContentDismissShareInfoCtaMutation } from "components/modal/unlockables/__generated__/UnlockableShareInfoModalContentDismissShareInfoCtaMutation.graphql";
import UsernameLink from "components/buttons/UsernameLink";
import notifyUnexpectedError from "components/toast/notifyUnexpectedError";
import useViewerId from "hooks/useViewerId";

const fragment = graphql`
  fragment UnlockableShareInfoModalContent_MetadataAccount on MetadataAccount {
    data {
      name
    }

    nft {
      Creator {
        username
      }
    }

    unlockable {
      id

      # Note: Keep in sync with useSettleSale Relay store update.
      unlockableWinners {
        hasBuyerDismissedShareInfoCta
        userEmail(input: $unlockableWinnerUserEmailInput)
      }
    }

    ...useNftKind_MetadataAccount
  }
`;

const updateBuyerInfoMutation = graphql`
  mutation UnlockableShareInfoModalContentUpdateBuyerInfoMutation(
    $input: UpdateUnlockableWinnerBuyerInfoInput!
    $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!
  ) {
    updateUnlockableWinnerBuyerInfo(input: $input) {
      unlockableWinner {
        ...useUnlockableCtaType_UnlockableWinnerExpress
      }
    }
  }
`;

const dismissShareInfoCtaMutation = graphql`
  mutation UnlockableShareInfoModalContentDismissShareInfoCtaMutation(
    $input: DismissUnlockableWinnerBuyerShareInfoCtaInput!
    $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!
  ) {
    dismissUnlockableWinnerBuyerShareInfoCta(input: $input) {
      unlockableWinner {
        ...useUnlockableCtaType_UnlockableWinnerExpress
      }
    }
  }
`;

type Props = {
  metadataAccount: UnlockableShareInfoModalContent_MetadataAccount$key;
};

export default function UnlockableShareInfoModalContent({
  metadataAccount,
}: Props) {
  const viewerId = useViewerId();
  const { onHide } = useUnlockableModalContext();
  const [email, setEmail] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [useProfileEmail, setUseProfileEmail] = useState(false);
  const { user } = useUserContext();
  const metadataAccountData = useFragment(fragment, metadataAccount);
  const [commitUpdateBuyerInfo, commitUpdateBuyerInfoInFlight] =
    useMutation<UnlockableShareInfoModalContentUpdateBuyerInfoMutation>(
      updateBuyerInfoMutation
    );
  const [commitDismissShareInfoCta, commitDismissShareInfoCtaInFlight] =
    useMutation<UnlockableShareInfoModalContentDismissShareInfoCtaMutation>(
      dismissShareInfoCtaMutation
    );

  const nftKind = useNftKind(metadataAccountData);
  const unlockableWinner = getUnlockableWinner(
    metadataAccountData.unlockable?.unlockableWinners,
    nftKind
  );

  const {
    unlockable,
    nft: { Creator },
    data: { name },
  } = metadataAccountData;

  if (user == null || unlockable == null || unlockableWinner == null) {
    return null;
  }

  const hasBuyerSharedInfo = unlockableWinner.userEmail != null;
  const { hasBuyerDismissedShareInfoCta } = unlockableWinner;

  const creatorName = <UsernameLink username={Creator!.username} />;

  const description = !hasBuyerSharedInfo ? (
    <Body1 className={styles.description} colorClass={ColorClass.Secondary}>
      {creatorName} has requested you share your email with them so they can
      coordinate sending you the unlockable for {name}. This information will
      only be shared with {creatorName}, and it will not be shown anywhere on
      your profile.
    </Body1>
  ) : (
    <Body1 className={styles.description} colorClass={ColorClass.Secondary}>
      The email you entered has been shared with {creatorName}. For further
      information about the unlockable, please contact {creatorName} directly
      (Formfunction does not fulfill or ship unlockables).
    </Body1>
  );

  const inputs = !hasBuyerSharedInfo && (
    <div className={styles.input}>
      <InputWithLabel
        input={
          <TextInput
            hasError={showErrors && !isValidEmail(email)}
            maxLength={MAX_EMAIL_LENGTH}
            maxLengthIndicator={false}
            onChange={(val) => {
              setEmail(val);
              if (user.email != null) {
                setUseProfileEmail(val === user.email);
              }
            }}
            placeholder="Enter your email address"
            value={email}
          />
        }
        label={<InputLabel label="Your email" />}
      />
      {user.email != null && (
        <CheckboxButtonWithLabel
          className={styles.useEmailCheckbox}
          isActive={useProfileEmail}
          label="Use the email on your account"
          noBorder
          onClick={() => {
            setUseProfileEmail(!useProfileEmail);
            setEmail(useProfileEmail ? "" : user.email!);
          }}
        />
      )}
    </div>
  );

  const isLoading =
    commitUpdateBuyerInfoInFlight || commitDismissShareInfoCtaInFlight;

  const button = !hasBuyerSharedInfo ? (
    <ButtonWithText
      buttonTheme={ButtonTheme.PurpleGradient}
      className={styles.saveButton}
      fontClass={FontClass.NavLink}
      isLoading={isLoading}
      onClick={() => {
        if (!isValidEmail(email)) {
          setShowErrors(true);
          return;
        }

        setShowErrors(false);

        commitUpdateBuyerInfo({
          onCompleted: () =>
            notify({ message: "Info shared", type: "success" }),
          onError: () => {
            notifyUnexpectedError();
          },
          variables: {
            input: {
              unlockableId: unlockable.id,
              userEmail: email,
            },
            unlockableWinnerUserEmailInput: {
              viewerId,
            },
          },
        });
      }}
    >
      Send to{" "}
      <UsernameLink
        buttonTheme={TextButtonTheme.White}
        username={Creator!.username}
      />
    </ButtonWithText>
  ) : (
    <ButtonWithText
      buttonTheme={ButtonTheme.PurpleGradient}
      className={styles.button}
      fontClass={FontClass.NavLink}
      onClick={onHide}
    >
      OK
    </ButtonWithText>
  );

  const canSeeDismissOption =
    !hasBuyerSharedInfo && !hasBuyerDismissedShareInfoCta;

  const dismissButton = canSeeDismissOption && (
    <TextButton
      buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
      className={styles.dismissButton}
      disabled={commitDismissShareInfoCtaInFlight}
      fontClass={FontClass.Body1}
      onClick={() => {
        commitDismissShareInfoCta({
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
  );

  const error = showErrors && !isValidEmail(email) && (
    <ErrorMessage fontClass={FontClass.Body1}>
      Please enter a valid email
    </ErrorMessage>
  );

  return (
    <div className={styles.body}>
      {description}
      {inputs}
      {button}
      {dismissButton}
      {error}
    </div>
  );
}
