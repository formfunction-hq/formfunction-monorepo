import ButtonWithText from "components/buttons/ButtonWithText";
import PageWithHeaderAndFooter from "components/containers/PageWithHeaderAndFooter";
import ResponsivePageBody from "components/containers/ResponsivePageBody";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import Body1 from "components/text/Body1";
import Header2 from "components/text/Header2";
import COMMUNITY_GOVERNED_DESCRIPTION from "constants/CommunityGovernedDescription";
import styles from "css/pages/create/CreateNotWhitelisted.module.css";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import GlobalClass from "types/enums/GlobalClass";
import getImgixUrl from "utils/getImgixUrl";

export default function CreateNotWhitelisted(): JSX.Element {
  return (
    <PageWithHeaderAndFooter>
      <ResponsivePageBody className={styles.body}>
        <img
          className={styles.image}
          src={getImgixUrl("illustrations/artists.png")}
        />
        <Header2 className={styles.title} colorClass={ColorClass.Primary}>
          Become an artist on{" "}
          <span className={GlobalClass.GradientText}>Formfunction</span>
        </Header2>
        <Body1 className={styles.description} colorClass={ColorClass.Primary}>
          {COMMUNITY_GOVERNED_DESCRIPTION}
        </Body1>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.submitButton}
          fontClass={FontClass.NavLink}
          href="/apply"
          icon={<ArrowRightIcon colorValue={ColorValue.White} size={24} />}
          type="link_internal"
        >
          Submit artist profile
        </ButtonWithText>
      </ResponsivePageBody>
    </PageWithHeaderAndFooter>
  );
}
