import styles from "css/pages/about/AboutJoin.module.css";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import ColorClass from "types/enums/ColorClass";
import Header3 from "components/text/Header3";
import Body1 from "components/text/Body1";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import getImgixUrl from "utils/getImgixUrl";
import useBreakpoint from "hooks/useBreakpoint";
import joinClasses from "utils/joinClasses";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import AspectRatioContainer from "components/containers/AspectRatioContainer";
import LandingSection from "components/pages/landing/LandingSection";

const TEAM_PICTURES = [
  getImgixUrl("about/team-1.JPG"),
  getImgixUrl("about/team-3.jpg"),
  getImgixUrl("about/team-5.JPG"),
  getImgixUrl("about/team-4.JPG"),
  getImgixUrl("about/team-2.JPG"),
];
const CAREER_URL =
  "https://formfunction.notion.site/Join-Formfunction-4d162e0369174c6c8a69b0653a7e594b";

function JoinCta(): JSX.Element {
  return (
    <div
      className={joinClasses(
        BackgroundColorClass.LightPurpleGradient,
        styles.joinContainer
      )}
    >
      <Header3
        className={styles.header}
        colorClass={ColorClass.Primary}
        textAlign="center"
      >
        Join us
      </Header3>
      <Body1
        className={styles.description}
        colorClass={ColorClass.Primary}
        textAlign="center"
      >
        We’re a small but passionate team who all share a vision of helping
        creators make a living.
      </Body1>
      <Body1
        className={styles.description}
        colorClass={ColorClass.Primary}
        textAlign="center"
      >
        Formfunction was built by creators, for creators: the majority of our
        team is made up of artists and creators.
      </Body1>
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        className={styles.button}
        fontClass={FontClass.NavLink}
        type="link_external"
        href={CAREER_URL}
      >
        Careers at Formfunction
      </ButtonWithText>
    </div>
  );
}
export default function AboutJoin(): JSX.Element {
  const { isTabletExtraWideBreakpoint } = useBreakpoint();

  const content = isTabletExtraWideBreakpoint ? (
    <div className={styles.verticalCards}>
      <AspectRatioContainer width={32} height={25}>
        <img src={TEAM_PICTURES[0]} />
      </AspectRatioContainer>
      <ResponsiveContainer className={styles.offsetCard}>
        <JoinCta />
      </ResponsiveContainer>
    </div>
  ) : (
    <ResponsiveContainer className={styles.container}>
      <div className={styles.verticalCards}>
        <AspectRatioContainer width={32} height={25}>
          <img src={TEAM_PICTURES[0]} />
        </AspectRatioContainer>
        <AspectRatioContainer width={19} height={20}>
          <img src={TEAM_PICTURES[1]} />
        </AspectRatioContainer>
      </div>
      <div className={joinClasses(styles.verticalCards, styles.offsetCard)}>
        <AspectRatioContainer width={23} height={20}>
          <img src={TEAM_PICTURES[2]} />
        </AspectRatioContainer>

        <JoinCta />
      </div>
      <div className={styles.verticalCards}>
        <AspectRatioContainer width={19} height={20}>
          <img src={TEAM_PICTURES[4]} />
        </AspectRatioContainer>

        <AspectRatioContainer width={32} height={25}>
          <img src={TEAM_PICTURES[3]} />
        </AspectRatioContainer>
      </div>
    </ResponsiveContainer>
  );

  return <LandingSection>{content}</LandingSection>;
}
