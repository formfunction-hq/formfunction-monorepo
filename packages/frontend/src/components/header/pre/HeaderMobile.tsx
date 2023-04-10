import ColorValue from "types/enums/ColorValue";
import HamburgerButton from "components/buttons/HamburgerButton";
import MenuMobile from "components/header/pre/MenuMobile";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import styles from "css/header/pre/HeaderMobile.module.css";
import { useState } from "react";

export default function HeaderMobile(): JSX.Element {
  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);

  return (
    <>
      <MenuMobile isShown={isMenuShown} onHide={() => setIsMenuShown(false)} />
      <div className={styles.containerOuter}>
        <ResponsiveContainer className={styles.containerResponsive}>
          <div className={styles.containerInner}>
            <HamburgerButton colorValue={ColorValue.Primary} isShown={false} />
            <a className={styles.logo} href="/">
              <img className={styles.logoImage} src="/images/logo-black.svg" />
              <h3 className={styles.logoText}>formfunction</h3>
            </a>
            <HamburgerButton
              colorValue={ColorValue.Secondary}
              onClick={() => setIsMenuShown(true)}
            />
          </div>
        </ResponsiveContainer>
      </div>
    </>
  );
}
