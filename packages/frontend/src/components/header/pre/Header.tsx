import styles from "css/header/pre/Header.module.css";
import HeaderDesktop from "components/header/pre/HeaderDesktop";
import HeaderMobile from "components/header/pre/HeaderMobile";

export default function Header(): JSX.Element {
  return (
    <>
      <div className={styles.mobileContainer}>
        <HeaderMobile />
      </div>
      <div className={styles.desktopContainer}>
        <HeaderDesktop />
      </div>
    </>
  );
}
