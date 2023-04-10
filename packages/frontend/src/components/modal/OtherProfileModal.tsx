import TextButton from "components/buttons/TextButton";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import AlertIcon from "components/icons/AlertIcon";
import GenericModal from "components/modal/GenericModal";
import { MAILTO_HELLO_EMAIL } from "constants/Emails";
import styles from "css/modal/OtherProfileModal.module.css";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import TextButtonTheme from "types/enums/TextButtonTheme";

type Props = {
  isShown: boolean;
  onHide: () => void;
  username: string;
};

export default function OtherProfileModal({
  isShown,
  onHide,
  username,
}: Props): JSX.Element {
  const body = (
    <ResponsiveContainer className={styles.body}>
      <TextButton
        buttonThemeOrColorClass={TextButtonTheme.Error}
        fontClass={FontClass.NavLink}
        href={`${MAILTO_HELLO_EMAIL}?subject=Formfunction: Reporting profile @${username}&body=Please explain why you are reporting this profile`}
        icon={<AlertIcon colorValue={ColorValue.Error} />}
        onClick={onHide}
        type="link_external"
      >
        Report
      </TextButton>
    </ResponsiveContainer>
  );

  return (
    <GenericModal isShown={isShown} onHide={onHide} title="Options">
      {body}
    </GenericModal>
  );
}
