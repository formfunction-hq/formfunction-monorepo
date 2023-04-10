import GenericModal from "components/modal/GenericModal";
import ArtName from "components/text/ArtName";
import Body1 from "components/text/Body1";
import styles from "css/modal/HowInvitesWorkModal.module.css";
import ColorClass from "types/enums/ColorClass";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";

type Props = {
  isShown: boolean;
  onHide: () => void;
};

export default function HowInvitesWorkModal({
  isShown,
  onHide,
}: Props): JSX.Element {
  return (
    <GenericModal
      className={styles.modal}
      isShown={isShown}
      onHide={onHide}
      title="How invites work"
    >
      <div className={styles.body}>
        <Body1 textAlign="center" colorClass={ColorClass.Secondary}>
          Formfunction&apos;s community decides how it grows—in addition to our
          voting system, we are piloting an invite model that lets our most
          active artists and collectors invite new creators to mint on
          Formfunction.
        </Body1>
        <div className={styles.section}>
          <ArtName colorClass={ColorClass.Primary}>
            How to get more invites
          </ArtName>
          <Body1 textAlign="center" colorClass={ColorClass.Secondary}>
            Right now, the invite system is in pilot mode, and members of our
            Advocate Program receive 3 invites per month. In the future, the
            invite system may be rolled out slowly to others on the platform.
          </Body1>
        </div>
        <ButtonWithText
          fontClass={FontClass.NavLink}
          buttonTheme={ButtonTheme.PurpleGradient}
          onClick={() => onHide()}
        >
          Got it
        </ButtonWithText>
      </div>
    </GenericModal>
  );
}
