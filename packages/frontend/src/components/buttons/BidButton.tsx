import styles from "css/buttons/BidButton.module.css";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";

type Props = {
  disabled?: boolean;
  onClick: () => void;
};

export default function BidButton({
  disabled = false,
  onClick,
}: Props): JSX.Element {
  return (
    <ButtonWithText
      buttonTheme={ButtonTheme.PurpleGradient}
      className={styles.button}
      disabled={disabled}
      fontClass={FontClass.NavLink}
      onClick={onClick}
    >
      Place a bid
    </ButtonWithText>
  );
}
