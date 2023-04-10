import ButtonWithText from "components/buttons/ButtonWithText";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import Body2 from "components/text/Body2";
import Header2 from "components/text/Header2";
import styles from "css/error/OnlyDesktopErrorPage.module.css";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import OnlyDesktopDescription from "types/enums/OnlyDesktopDescription";
import getImgixUrl from "utils/getImgixUrl";

type Props = {
  description: OnlyDesktopDescription;
};

export default function OnlyDesktopErrorPage({
  description,
}: Props): JSX.Element {
  return (
    <ResponsiveContainer className={styles.container}>
      <Header2 colorClass={ColorClass.Primary} textAlign="center">
        Whoops! Try this again on desktop.
      </Header2>
      <img
        className={styles.image}
        src={getImgixUrl("illustrations/stressed-by-technology.png")}
      />
      <Body2 colorClass={ColorClass.Primary} textAlign="center">
        {description}
      </Body2>
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        fontClass={FontClass.NavLink}
        href="/explore"
        type="link_internal"
      >
        Explore amazing art
      </ButtonWithText>
    </ResponsiveContainer>
  );
}
