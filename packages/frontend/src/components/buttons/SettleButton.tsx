import styles from "css/buttons/SettleButton.module.css";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";

type Props = {
  setIsSettleModalShown: (val: boolean) => void;
};

export default function SettleButton({
  setIsSettleModalShown,
}: Props): JSX.Element {
  return (
    <ButtonWithText
      buttonTheme={ButtonTheme.PurpleGradient}
      className={styles.button}
      fontClass={FontClass.NavLink}
      onClick={() => setIsSettleModalShown(true)}
    >
      Settle auction
    </ButtonWithText>
  );
}
