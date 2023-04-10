import styles from "css/header/Header.module.css";
import HeaderDesktop from "components/header/HeaderDesktop";
import HeaderMobile from "components/header/HeaderMobile";
import HeaderTheme from "types/enums/HeaderTheme";
import useSolanaContext from "hooks/useSolanaContext";

type Props = {
  headerTheme?: HeaderTheme;
  showAccountSetupModal?: boolean;
};

export default function Header({
  headerTheme = HeaderTheme.Dark,
  showAccountSetupModal,
}: Props): JSX.Element {
  const { anchorWallet } = useSolanaContext();

  return (
    <>
      {anchorWallet === null && (
        <div className={styles.mobileContainer}>
          <HeaderMobile
            headerTheme={headerTheme}
            showAccountSetupModal={showAccountSetupModal}
          />
        </div>
      )}
      <div className={styles.desktopContainer}>
        <HeaderDesktop
          headerTheme={headerTheme}
          showAccountSetupModal={showAccountSetupModal}
        />
      </div>
    </>
  );
}
