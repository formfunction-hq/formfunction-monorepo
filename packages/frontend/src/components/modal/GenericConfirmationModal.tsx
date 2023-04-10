import ButtonWithText from "components/buttons/ButtonWithText";
import PrimaryAndSecondaryButtonContainer from "components/buttons/PrimaryAndSecondaryButtonContainer";
import TextButton from "components/buttons/TextButton";
import GenericModal from "components/modal/GenericModal";
import styles from "css/modal/GenericConfirmationModal.module.css";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";

type Props = {
  bodyText: string | JSX.Element;
  buttonText?: string;
  cancelButtonText?: string;
  confirmButtonDisabled?: boolean;
  isLoading?: boolean;
  isShown: boolean;
  onConfirmClick: () => void;
  onHide: () => void;
  title: string;
};

export default function GenericConfirmationModal({
  bodyText,
  buttonText = "Confirm",
  cancelButtonText,
  confirmButtonDisabled = false,
  isLoading = false,
  isShown,
  onConfirmClick,
  onHide,
  title,
}: Props): JSX.Element {
  const body = (
    <div className={styles.body}>
      <PrimaryAndSecondaryButtonContainer>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.confirmButton}
          disabled={confirmButtonDisabled}
          fontClass={FontClass.NavLink}
          isLoading={isLoading}
          onClick={onConfirmClick}
        >
          {buttonText}
        </ButtonWithText>
        {cancelButtonText != null && (
          <TextButton
            buttonThemeOrColorClass={TextButtonTheme.PurpleGradient}
            fontClass={FontClass.NavLink}
            onClick={onHide}
          >
            {cancelButtonText}
          </TextButton>
        )}
      </PrimaryAndSecondaryButtonContainer>
    </div>
  );

  return (
    <GenericModal
      className={styles.modal}
      description={bodyText}
      isShown={isShown}
      onHide={onHide}
      title={title}
    >
      {body}
    </GenericModal>
  );
}
