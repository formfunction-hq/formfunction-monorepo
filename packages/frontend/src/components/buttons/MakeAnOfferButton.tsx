import styles from "css/buttons/MakeAnOfferButton.module.css";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

type Props = {
  disabled?: boolean;
  onClick: () => void;
};

export default function MakeAnOfferButton({
  disabled = false,
  onClick,
}: Props): Maybe<JSX.Element> {
  return (
    <ButtonWithText
      buttonTheme={ButtonTheme.BrightPurpleOutline}
      className={styles.button}
      disabled={disabled}
      fontClass={FontClass.NavLink}
      onClick={onClick}
    >
      Make an offer
    </ButtonWithText>
  );
}
