import ButtonWithText from "components/buttons/ButtonWithText";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import Header2 from "components/text/Header2";
import styles from "css/pages/errors/Page404Content.module.css";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";

type Props = {
  message?: string;
};

export default function Page404Content({
  message = "This is not the page you're looking for...",
}: Props) {
  return (
    <div className={styles.body}>
      <Header2 colorClass={ColorClass.Primary} textAlign="center">
        {message}
      </Header2>
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        fontClass={FontClass.NavLink}
        href="/explore"
        icon={<ArrowRightIcon colorValue={ColorValue.White} size={24} />}
        type="link_internal"
      >
        Go to explore
      </ButtonWithText>
    </div>
  );
}
