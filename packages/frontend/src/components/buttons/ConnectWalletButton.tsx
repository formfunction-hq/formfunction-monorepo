import ButtonWithText from "components/buttons/ButtonWithText";
import useSolanaContext from "hooks/useSolanaContext";
import { useState } from "react";
import ButtonTheme from "types/enums/ButtonTheme";
import FontClass from "types/enums/FontClass";
import getSignature from "utils/local-storage/getSignature";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConnectWalletModals from "components/modal/ConnectWalletModals";

type Props = {
  alternateSignInText?: string;
  buttonTheme?: ButtonTheme;
  onClick?: () => void;
  showAccountSetupModal?: boolean;
};

export default function ConnectWalletButton({
  alternateSignInText,
  buttonTheme = ButtonTheme.PurpleGradient,
  onClick,
  showAccountSetupModal = true,
}: Props): Maybe<JSX.Element> {
  const { anchorWallet } = useSolanaContext();
  const [isModalShown, setIsModalShown] = useState(false);
  const existingSignature =
    anchorWallet == null
      ? null
      : getSignature(anchorWallet.publicKey.toString());

  const signInButton = (
    <ButtonWithText
      buttonTheme={buttonTheme}
      fontClass={FontClass.NavLink}
      onClick={() => {
        if (onClick != null) {
          onClick();
        }
        setIsModalShown(true);
      }}
    >
      {alternateSignInText ?? "Sign in"}
    </ButtonWithText>
  );

  if (
    anchorWallet != null &&
    existingSignature != null &&
    existingSignature !== "" &&
    !showAccountSetupModal
  ) {
    return null;
  }

  return (
    <>
      <ConnectWalletModals
        isShown={isModalShown}
        onHide={() => setIsModalShown(false)}
        showAccountSetupModal={showAccountSetupModal}
      />
      {signInButton}
    </>
  );
}
