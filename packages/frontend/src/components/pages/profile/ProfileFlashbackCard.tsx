import ButtonWithText from "components/buttons/ButtonWithText";
import ProfileCard from "components/pages/profile/ProfileCard";
import Body1 from "components/text/Body1";
import Header3 from "components/text/Header3";
import styles from "css/pages/profile/ProfileFlashbackCard.module.css";
import Imgix from "react-imgix";
import ButtonTheme from "types/enums/ButtonTheme";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import getImgixUrl from "utils/getImgixUrl";

export default function ProfileFlashbackCard(): JSX.Element {
  return (
    <ProfileCard>
      <Imgix
        className={styles.image}
        src={getImgixUrl("illustrations/celebration.png")}
        width={500}
      />
      <div>
        <Header3 colorClass={ColorClass.Primary}>
          Your Formfunction Flashback
        </Header3>
        <Body1 className={styles.description} colorClass={ColorClass.Primary}>
          Thanks for spending an amazing year with us! Take a look back at some
          of your personal highlights and accomplishments.
        </Body1>
        <ButtonWithText
          buttonTheme={ButtonTheme.PurpleGradient}
          className={styles.button}
          fontClass={FontClass.Body1Medium}
          href="/flashback"
          type="link_internal"
        >
          See your Flashback
        </ButtonWithText>
      </div>
    </ProfileCard>
  );
}
