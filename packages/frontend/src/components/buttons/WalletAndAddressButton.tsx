import PlainButton from "components/buttons/PlainButton";
import CopyIcon from "components/icons/CopyIcon";
import NavLink from "components/text/NavLink";
import styles from "css/buttons/WalletAndAddressButton.module.css";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import useSolanaContext from "hooks/useSolanaContext";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import copyTextToClipboard from "utils/copyTextToClipboard";
import shortenAddress from "utils/shortenAddress";

export default function WalletAndAddressButton(): Maybe<JSX.Element> {
  const { anchorWallet } = useSolanaContext();
  const address = anchorWallet?.publicKey?.toString();

  if (address == null) {
    return null;
  }

  return (
    <PlainButton
      className={styles.button}
      onClick={() => copyTextToClipboard(address)}
      transparentBg={false}
      type="button"
    >
      <img className={styles.icon} src={anchorWallet?.wallet.icon} />
      <NavLink colorClass={ColorClass.Primary}>
        {shortenAddress(address)}
      </NavLink>
      <CopyIcon colorValue={ColorValue.Secondary} />
    </PlainButton>
  );
}
