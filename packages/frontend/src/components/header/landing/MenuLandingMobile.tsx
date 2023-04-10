import CloseButton from "components/buttons/CloseButton";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import TextButton from "components/buttons/TextButton";
import TextButtonTheme from "types/enums/TextButtonTheme";
import styles from "css/header/landing/MenuLandingMobile.module.css";
import useSolanaContext from "hooks/useSolanaContext";
import HELP_LINK from "constants/HelpLink";
import useUserContext from "hooks/useUserContext";
import { Drawer as MantineDrawer } from "@mantine/core";
import ButtonWithText from "components/buttons/ButtonWithText";
import ButtonTheme from "types/enums/ButtonTheme";
import { useState } from "react";
import ConnectWalletModals from "components/modal/ConnectWalletModals";
import CreateModalOrPopover from "components/modal/CreateModalOrPopover";

function Button({
  children,
  href,
  onClick,
  type = "link_internal",
}: {
  children: string;
  href: string;
  onClick: () => void;
  type?: "link_internal" | "link_external";
}): JSX.Element {
  return (
    <TextButton
      buttonThemeOrColorClass={TextButtonTheme.Primary}
      fontClass={FontClass.NavLink}
      href={href}
      onClick={onClick}
      type={type}
    >
      {children}
    </TextButton>
  );
}

type Props = {
  isShown: boolean;
  onHide: () => void;
};

export default function MenuLandingMobile({
  isShown,
  onHide,
}: Props): JSX.Element {
  const { anchorWallet } = useSolanaContext();
  const { profileHref, user } = useUserContext();
  const [isConnectWalletModalsShown, setIsConnectWalletModalsShown] =
    useState(false);
  const [isCreateModalShown, setIsCreateModalShown] = useState(false);

  const loggedInButtons = (
    <div className={styles.textButtons}>
      <div className={styles.firstRow}>
        <CloseButton
          className={styles.closeButton}
          colorValue={ColorValue.Primary}
          isShown={false}
        />
        <Button href="/explore" onClick={onHide}>
          Explore
        </Button>
        <CloseButton
          className={styles.closeButton}
          colorValue={ColorValue.Secondary}
          onClick={onHide}
        />
      </div>
      <Button href="/spotlights" onClick={onHide} type="link_internal">
        Spotlights
      </Button>
      <Button href="/activity" onClick={onHide} type="link_internal">
        Activity
      </Button>
      <Button href={profileHref} onClick={onHide} type="link_internal">
        Profile
      </Button>
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        fontClass={FontClass.NavLink}
        onClick={() => {
          onHide();
          setIsCreateModalShown(true);
        }}
      >
        Create
      </ButtonWithText>
    </div>
  );

  const loggedOutButtons = (
    <div className={styles.textButtons}>
      <div className={styles.firstRow}>
        <CloseButton
          className={styles.closeButton}
          colorValue={ColorValue.Primary}
          isShown={false}
        />
        <Button href="/explore" onClick={onHide}>
          Explore
        </Button>
        <CloseButton
          className={styles.closeButton}
          colorValue={ColorValue.Secondary}
          onClick={onHide}
        />
      </div>
      <Button href="/spotlights" onClick={onHide} type="link_internal">
        Spotlights
      </Button>
      <Button href={HELP_LINK} onClick={onHide} type="link_external">
        Help
      </Button>
      <Button href="/apply" onClick={onHide} type="link_internal">
        Submit artist profile
      </Button>
      <ButtonWithText
        buttonTheme={ButtonTheme.PurpleGradient}
        fontClass={FontClass.NavLink}
        onClick={() => {
          onHide();
          setIsConnectWalletModalsShown(true);
        }}
      >
        Sign In
      </ButtonWithText>
    </div>
  );

  return (
    <>
      <CreateModalOrPopover
        button={null}
        isShown={isCreateModalShown}
        setIsShown={setIsCreateModalShown}
      />
      <ConnectWalletModals
        isShown={isConnectWalletModalsShown}
        onHide={() => setIsConnectWalletModalsShown(false)}
      />
      <MantineDrawer
        overlayColor={ColorValue.BackgroundOverlay}
        position="top"
        opened={isShown}
        onClose={onHide}
        transitionDuration={0}
        size={240}
      >
        <ResponsiveContainer className={styles.container}>
          {anchorWallet == null || user?.hasCompletedSignup !== true
            ? loggedOutButtons
            : loggedInButtons}
        </ResponsiveContainer>
      </MantineDrawer>
    </>
  );
}
