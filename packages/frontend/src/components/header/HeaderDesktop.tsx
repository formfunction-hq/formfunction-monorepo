import useSolanaContext from "hooks/useSolanaContext";
import HeaderTheme from "types/enums/HeaderTheme";
import styles from "css/header/HeaderDesktop.module.css";
import TextButtonTheme from "types/enums/TextButtonTheme";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import Header1 from "components/text/Header1";
import HeaderDesktopSearch from "components/header/HeaderDesktopSearch";
import TextButton from "components/buttons/TextButton";
import FontClass from "types/enums/FontClass";
import ActivityButton from "components/buttons/ActivityButton";
import ProfileButton from "components/buttons/ProfileButton";
import ConnectWalletButton from "components/buttons/ConnectWalletButton";
import { Suspense } from "react";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import HELP_LINK from "constants/HelpLink";
import useUserContext from "hooks/useUserContext";
import { Link } from "react-router-dom";
import useLogoSrc from "hooks/useLogoSrc";
import CreateButton from "components/buttons/CreateButton";
import joinClasses from "utils/joinClasses";

function RightSection({
  buttonTheme,
  showAccountSetupModal,
}: {
  buttonTheme: TextButtonTheme;
  showAccountSetupModal?: boolean;
}): Maybe<JSX.Element> {
  const { anchorWallet } = useSolanaContext();
  const { user } = useUserContext();

  const connectedRightSection = (
    <>
      <TextButton
        buttonThemeOrColorClass={buttonTheme}
        fontClass={FontClass.NavLink}
        href="/explore"
        target=""
        type={
          // TODO: find cleaner solution
          // After minting NFT, we don't update local state. So page needs to be refreshed
          // to pull down the freshly minted NFT and show it in Explore
          window.location.href.includes("/create")
            ? "link_external"
            : "link_internal"
        }
      >
        Explore
      </TextButton>
      <TextButton
        buttonThemeOrColorClass={buttonTheme}
        fontClass={FontClass.NavLink}
        href="/spotlights"
        target=""
        type="link_internal"
      >
        Spotlights
      </TextButton>
      <ActivityButton />
      <ProfileButton />
      <CreateButton />
    </>
  );

  const disconnectedRightSection = (
    <>
      <TextButton
        buttonThemeOrColorClass={buttonTheme}
        fontClass={FontClass.NavLink}
        href="/explore"
        type="link_internal"
      >
        Explore
      </TextButton>
      <TextButton
        buttonThemeOrColorClass={buttonTheme}
        fontClass={FontClass.NavLink}
        href="/spotlights"
        target=""
        type="link_internal"
      >
        Spotlights
      </TextButton>
      <TextButton
        buttonThemeOrColorClass={buttonTheme}
        fontClass={FontClass.NavLink}
        href={HELP_LINK}
        type="link_external"
      >
        Help
      </TextButton>
      <ConnectWalletButton showAccountSetupModal={showAccountSetupModal} />
    </>
  );

  if (anchorWallet === undefined || user === undefined) {
    return null;
  }

  return anchorWallet?.publicKey == null ||
    user == null ||
    user.hasCompletedSignup !== true
    ? disconnectedRightSection
    : connectedRightSection;
}

type Props = {
  className?: string;
  headerTheme: HeaderTheme;
  showAccountSetupModal?: boolean;
};

export default function HeaderDesktop({
  headerTheme,
  showAccountSetupModal,
  className,
}: Props): JSX.Element {
  const buttonTheme =
    headerTheme === HeaderTheme.Light
      ? TextButtonTheme.White
      : TextButtonTheme.Primary;
  const logoSrc = useLogoSrc(headerTheme);

  return (
    <ResponsiveContainer>
      <Header1
        className={joinClasses(styles.header, className)}
        colorClass={null}
        textAlign="center"
      >
        <div className={styles.left}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={logoSrc} alt="logo" />
          </Link>
          <HeaderDesktopSearch headerTheme={headerTheme} />
        </div>
        <div className={styles.right}>
          <Suspense fallback={<div />}>
            <RightSection
              buttonTheme={buttonTheme}
              showAccountSetupModal={showAccountSetupModal}
            />
          </Suspense>
        </div>
      </Header1>
    </ResponsiveContainer>
  );
}
