import ColorValue from "types/enums/ColorValue";
import HamburgerButton from "components/buttons/HamburgerButton";
import MenuLandingMobile from "components/header/landing/MenuLandingMobile";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import styles from "css/header/landing/HeaderLandingMobile.module.css";
import { useState } from "react";
import HeaderTheme from "types/enums/HeaderTheme";
import ColorClass from "types/enums/ColorClass";
import joinClasses from "utils/joinClasses";
import { Link } from "react-router-dom";
import useLogoSrc from "hooks/useLogoSrc";

type Props = {
  headerTheme: HeaderTheme;
};

export default function HeaderLandingMobile({
  headerTheme,
}: Props): JSX.Element {
  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);
  const colorClass =
    headerTheme === HeaderTheme.Light ? ColorClass.White : ColorClass.Primary;
  const colorValue =
    headerTheme === HeaderTheme.Light ? ColorValue.White : ColorValue.Secondary;
  const logoSrc = useLogoSrc(headerTheme);

  return (
    <>
      <MenuLandingMobile
        isShown={isMenuShown}
        onHide={() => setIsMenuShown(false)}
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
