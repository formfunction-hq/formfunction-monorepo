import styles from "css/header/landing/HeaderLanding.module.css";
import HeaderDesktop from "components/header/HeaderDesktop";
import HeaderLandingMobile from "components/header/landing/HeaderLandingMobile";
import HeaderTheme from "types/enums/HeaderTheme";

type Props = {
  headerTheme?: HeaderTheme;
};

export default function HeaderLanding({
  headerTheme = HeaderTheme.Dark,
}: Props): JSX.Element {
  return (
    <>
      <div className={styles.mobileContainer}>
        <HeaderLandingMobile headerTheme={headerTheme} />
      </div>
      <div className={styles.desktopContainer}>
        <HeaderDesktop headerTheme={headerTheme} />
      </div>
    </>
  );
}
