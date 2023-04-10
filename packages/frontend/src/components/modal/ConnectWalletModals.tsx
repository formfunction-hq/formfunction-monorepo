import ConnectWalletModal from "components/modal/ConnectWalletModal";
import useSolanaContext from "hooks/useSolanaContext";
import AccountSetupModalContainer from "components/modal/AccountSetupModalContainer";
import getSignature from "utils/local-storage/getSignature";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

type Props = {
  isShown: boolean;
  onHide: () => void;
  showAccountSetupModal?: boolean;
};

export default function ConnectWalletModals({
  isShown,
  onHide,
  showAccountSetupModal = true,
}: Props): Maybe<JSX.Element> {
  const { anchorWallet } = useSolanaContext();
  const existingSignature =
    anchorWallet == null
      ? null
      : getSignature(anchorWallet.publicKey.toString());

  if (
    anchorWallet != null &&
    existingSignature != null &&
    existingSignature !== ""
  ) {
    if (!showAccountSetupModal) {
      return null;
    }

    return <AccountSetupModalContainer />;
  }

  return <ConnectWalletModal isShown={isShown} onHide={onHide} />;
}
