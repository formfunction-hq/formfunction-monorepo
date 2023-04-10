import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import styles from "css/listing/ListButton.module.css";

type Props = {
  children: any;
  disabled?: boolean;
  isLoading: boolean;
  onClick: () => void;
};

export default function ListButton({
  children,
  disabled = false,
  isLoading,
  onClick,
}: Props) {
  return (
    <ButtonWithText
      buttonTheme={ButtonTheme.PurpleGradient}
      className={styles.listButton}
      disabled={disabled}
      fontClass={FontClass.NavLink}
      isLoading={isLoading}
      onClick={onClick}
    >
      {children}
    </ButtonWithText>
  );
}
