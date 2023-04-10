import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import getImgixUrl from "utils/getImgixUrl";
import styles from "css/modal/GenericSuccessModalContent.module.css";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";

type Props = {
  button?: JSX.Element;
  message: string;
  onHide: () => void;
  type: "minimal" | "standard";
};

export default function GenericSuccessModalContent({
  button,
  message,
  onHide,
  type,
}: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <Body1 colorClass={ColorClass.Secondary} textAlign="center">
        {message}
      </Body1>
      {type === "minimal" ? (
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          fontClass={FontClass.NavLink}
          onClick={onHide}
        >
          OK
        </ButtonWithText>
      ) : (
        <>
          <img
            className={styles.image}
            src={getImgixUrl("illustrations/bid-success.png")}
          />
          {button != null && button}
        </>
      )}
    </div>
  );
}
