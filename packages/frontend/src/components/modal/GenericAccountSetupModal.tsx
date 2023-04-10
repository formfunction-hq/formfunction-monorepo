import ButtonWithText from "components/buttons/ButtonWithText";
import InputLabel from "components/input/InputLabel";
import InputWithLabel from "components/input/InputWithLabel";
import TextInput from "components/input/TextInput";
import GenericModal from "components/modal/GenericModal";
import Body1 from "components/text/Body1";
import Header2 from "components/text/Header2";
import styles from "css/modal/GenericAccountSetupModal.module.css";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import { useState } from "react";
import isValidUsername from "formfn-shared/dist/utils/validation/isValidUsername";
import WEBSITE_URL from "constants/WebsiteUrl";
import ErrorMessage from "components/text/ErrorMessage";
import useErrorMessage from "hooks/useErrorMessage";
import ErrorMessageMsg from "types/enums/ErrorMessageMsg";
import isValidEmail from "formfn-shared/dist/utils/validation/isValidEmail";
import { MAX_EMAIL_LENGTH, MAX_USERNAME_LENGTH } from "constants/MaxLengths";
import { EMAIL_SUB_LABEL, USERNAME_SUB_LABEL } from "constants/InputSubLabels";
import CheckboxButton from "components/buttons/CheckboxButton";
import Body2 from "components/text/Body2";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import isUsernameTaken from "utils/isUsernameTaken";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

type Props = {
  // If set, this value will be locked and cannot be changed
  emailPreset?: string;
  isShown: boolean;
  onCreateAccount: (
    setIsLoading: (isLoading: boolean) => void,
    setErrorMessage: (errorMessage: Maybe<ErrorMessageMsg>) => void,
    email: string,
    username: string
  ) => void;
  onHide: () => void;
};

export default function GenericAccountSetupModal({
  emailPreset,
  isShown,
  onCreateAccount,
  onHide,
}: Props): JSX.Element {
  const [errorMessage, setErrorMessage] = useErrorMessage();
  const [email, setEmail] = useState(emailPreset ?? "");
  const [touched, setTouched] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const createAccount = async () => {
    setTouched(true);

    if (!isValidEmail(email)) {
      setErrorMessage(ErrorMessageMsg.InvalidEmail);
      return;
    }

    if (!isValidUsername(username)) {
      setErrorMessage(ErrorMessageMsg.InvalidUsername);
      return;
    }

    setIsLoading(true);

    const usernameTaken = await isUsernameTaken(username);
    if (usernameTaken) {
      setErrorMessage(ErrorMessageMsg.UsernameTaken);
      setIsLoading(false);
      return;
    }

    onCreateAccount(setIsLoading, setErrorMessage, email, username);
  };

  return (
    <GenericModal hideCloseButton isShown={isShown} onHide={onHide}>
      <div className={styles.body}>
        <Header2 colorClass={ColorClass.Primary} textAlign="center">
          Welcome to Formfunction!
        </Header2>
        <Body1
          className={styles.description}
          colorClass={ColorClass.Secondary}
          textAlign="center"
        >
          To set up your account, you just need to choose a username and enter
          your email. You can always edit this info later.
        </Body1>
        <div className={styles.inputs}>
          <InputWithLabel
            input={
              <TextInput
                disablePermaPlaceholderGap
                className={styles.usernameInput}
                hasError={touched && !isValidUsername(username)}
                value={username}
                maxLength={MAX_USERNAME_LENGTH}
                onChange={(val) => {
                  setUsername(val);
                  setErrorMessage(null);
                }}
                permaPlaceholder={`${WEBSITE_URL}@`}
              />
            }
            label={
              <InputLabel
                label="Username"
                subLabel={USERNAME_SUB_LABEL}
                required
              />
            }
          />
          <InputWithLabel
            input={
              <TextInput
                className={
                  emailPreset != null ? styles.presetEmailInput : undefined
                }
                hasError={touched && !isValidEmail(email)}
                value={emailPreset == null ? email : ""}
                placeholder={emailPreset != null ? email : ""}
                maxLength={MAX_EMAIL_LENGTH}
                maxLengthIndicator={false}
                onChange={(val) => {
                  if (emailPreset != null) {
                    return;
                  }
                  setEmail(val);
                  setErrorMessage(null);
                }}
                onPressEnter={createAccount}
                readOnly={emailPreset != null}
              />
            }
            label={
              <InputLabel label="Email" subLabel={EMAIL_SUB_LABEL} required />
            }
          />
          <div className={styles.checkboxRow}>
            <CheckboxButton
              isActive={isChecked}
              onClick={() => setIsChecked((val) => !val)}
            />
            <Body2 colorClass={ColorClass.Primary}>
              By checking this box, you agree to the{" "}
              <TextButton
                buttonThemeOrColorClass={TextButtonTheme.Primary}
                display="inline"
                href="/privacy.pdf"
                type="link_external"
              >
                Privacy Policy
              </TextButton>{" "}
              and{" "}
              <TextButton
                buttonThemeOrColorClass={TextButtonTheme.Primary}
                display="inline"
                href="/terms.pdf"
                type="link_external"
              >
                Terms of Service
              </TextButton>
              .
            </Body2>
          </div>
        </div>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.button}
          disabled={!isChecked}
          fontClass={FontClass.NavLink}
          isLoading={isLoading}
          onClick={createAccount}
        >
          Start exploring Formfunction
        </ButtonWithText>
        {errorMessage && (
          <ErrorMessage fontClass={FontClass.Body1}>
            {errorMessage}
          </ErrorMessage>
        )}
      </div>
    </GenericModal>
  );
}
