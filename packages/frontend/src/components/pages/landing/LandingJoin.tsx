import Body1 from "components/text/Body1";
import ColorClass from "types/enums/ColorClass";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import styles from "css/pages/landing/LandingJoin.module.css";
import Header2 from "components/text/Header2";
import ButtonWithText from "components/buttons/ButtonWithText";
import FontClass from "types/enums/FontClass";
import ButtonTheme from "types/enums/ButtonTheme";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import ColorValue from "types/enums/ColorValue";
import useColorModeContext from "hooks/useColorModeContext";
import COMMUNITY_GOVERNED_DESCRIPTION from "constants/CommunityGovernedDescription";

function Gradient(): JSX.Element {
  return (
    <div className={styles.gradient}>
      <img
        className={styles.blur}
        src="images/landing/bottom-blur.png"
        height={1307}
        width={1660}
      />
    </div>
  );
}

export default function LandingJoin(): JSX.Element {
  const { isLightMode } = useColorModeContext();

  return (
    <ResponsiveContainer className={styles.container}>
      <div className={styles.containerInner}>
        <Header2 colorClass={ColorClass.Primary} textAlign="center">
          Join as an artist
        </Header2>
        <Body1
          className={styles.description}
          colorClass={ColorClass.Primary}
          textAlign="center"
        >
          {COMMUNITY_GOVERNED_DESCRIPTION}
        </Body1>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.button}
          fontClass={FontClass.NavLink}
          href="/apply"
          icon={<ArrowRightIcon colorValue={ColorValue.White} size={24} />}
          type="link_internal"
        >
          Submit artist profile
        </ButtonWithText>
      </div>
      {isLightMode && <Gradient />}
    </ResponsiveContainer>
  );
}
