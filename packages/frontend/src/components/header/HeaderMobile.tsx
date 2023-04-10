import ColorValue from "types/enums/ColorValue";
import HamburgerButton from "components/buttons/HamburgerButton";
import MenuMobile from "components/header/MenuMobile";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import styles from "css/header/HeaderMobile.module.css";
import { useState } from "react";
import HeaderTheme from "types/enums/HeaderTheme";
import ColorClass from "types/enums/ColorClass";
import joinClasses from "utils/joinClasses";
import { Link } from "react-router-dom";
import useLogoSrc from "hooks/useLogoSrc";

type Props = {
  headerTheme: HeaderTheme;
  showAccountSetupModal?: boolean;
};

export default function HeaderMobile({
  headerTheme,
  showAccountSetupModal,
}: Props): JSX.Element {
  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);
  const colorClass =
    headerTheme === HeaderTheme.Light ? ColorClass.White : ColorClass.Primary;
  const colorValue =
    headerTheme === HeaderTheme.Light ? ColorValue.White : ColorValue.Secondary;
  const logoSrc = useLogoSrc(headerTheme);

  return (
    <>
      <MenuMobile
        isShown={isMenuShown}
        onHide={() => setIsMenuShown(false)}
        showAccountSetupModal={showAccountSetupModal}
      />
      <div className={styles.containerOuter}>
        <ResponsiveContainer className={styles.containerResponsive}>
          <div className={styles.containerInner}>
            <HamburgerButton colorValue={ColorValue.Primary} isShown={false} />
            <Link className={styles.logo} to="/">
              <img className={styles.logoImage} src={logoSrc} />
              <h3 className={joinClasses(styles.logoText, colorClass)}>
                formfunction
              </h3>
            </Link>
            <HamburgerButton
              colorValue={colorValue}
              onClick={() => setIsMenuShown(true)}
            />
          </div>
        </ResponsiveContainer>
      </div>
    </>
  );
}
