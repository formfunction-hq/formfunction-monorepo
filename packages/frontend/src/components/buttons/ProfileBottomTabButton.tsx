import Body2 from "components/text/Body2";
import ColorClass from "types/enums/ColorClass";
import PlainButton from "components/buttons/PlainButton";
import joinClasses from "utils/joinClasses";
import styles from "css/buttons/ProfileBottomTabButton.module.css";
import { Link } from "react-router-dom";
import useUserContext from "hooks/useUserContext";
import MaybeImgix from "components/images/MaybeImgix";
import Imgix from "react-imgix";

function ProfileActiveIcon() {
  const { user } = useUserContext();

  if (user?.ProfilePhoto?.photoUrl != null) {
    const imageSrc = user?.ProfilePhoto?.photoUrl;
    return (
      <MaybeImgix src={imageSrc}>
        <Imgix className={styles.profileActiveIcon} src={imageSrc} width={32} />
        <img className={styles.profileActiveIcon} src={imageSrc} />
      </MaybeImgix>
    );
  }

  return <div className={styles.profileActiveIcon} />;
}

function ProfileInactiveIcon() {
  const { user } = useUserContext();

  if (user?.ProfilePhoto?.photoUrl != null) {
    const imageSrc = user?.ProfilePhoto?.photoUrl;
    return (
      <MaybeImgix src={imageSrc}>
        <Imgix
          className={styles.profileInactiveIcon}
          src={imageSrc}
          width={32}
        />
        <img className={styles.profileInactiveIcon} src={imageSrc} />
      </MaybeImgix>
    );
  }

  return <div className={styles.profileInactiveIcon} />;
}

export default function ProfileBottomTabButton(): JSX.Element {
  const { profileHref } = useUserContext();
  const isActive = window.location.href.includes(profileHref);

  return (
    <Link to={profileHref}>
      <PlainButton
        className={joinClasses(
          styles.tabButton,
          isActive ? styles.tabButtonActive : null
        )}
      >
        {isActive ? <ProfileActiveIcon /> : <ProfileInactiveIcon />}
        <Body2
          colorClass={isActive ? ColorClass.BrightPurple : ColorClass.Secondary}
          className={styles.tabButtonText}
        >
          Profile
        </Body2>
      </PlainButton>
    </Link>
  );
}
