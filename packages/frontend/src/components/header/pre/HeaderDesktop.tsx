import styles from "css/header/pre/HeaderDesktop.module.css";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import Header1 from "components/text/Header1";
import FontClass from "types/enums/FontClass";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import ArrowRightIcon from "components/icons/ArrowRightIcon";
import ColorValue from "types/enums/ColorValue";

export default function HeaderDesktop(): JSX.Element {
  return (
    <ResponsiveContainer>
      <Header1 className={styles.header} colorClass={null} textAlign="center">
        <a className={styles.logo} href="/">
          <img src="/images/logo-black.svg" />
          <h3 className={styles.logoText}>formfunction</h3>
        </a>
        <div className={styles.right}>
          {/* <TextButton
            buttonTheme={TextButtonTheme.Primary}
            fontClass={FontClass.NavLink}
            href="/about"
            type="link_internal"
          >
            About
          </TextButton> */}
          <ButtonWithText
            buttonTheme={ButtonTheme.PurpleGradient}
            fontClass={FontClass.NavLink}
            href="/apply"
            icon={<ArrowRightIcon colorValue={ColorValue.White} size={24} />}
            type="link_internal"
          >
            Join as an artist
          </ButtonWithText>
        </div>
      </Header1>
    </ResponsiveContainer>
  );
}
