import ShadowButton from "components/buttons/ShadowButton";
import CopyIcon from "components/icons/CopyIcon";
import Body2 from "components/text/Body2";
import styles from "css/buttons/CopyAddressButton.module.css";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import copyTextToClipboard from "utils/copyTextToClipboard";
import shortenAddress from "utils/shortenAddress";

type Props = {
  address: string;
  extraShort?: boolean;
};

export default function CopyAddressButton({
  address,
  extraShort = false,
}: Props): JSX.Element {
  return (
    <ShadowButton
      className={styles.button}
      onClick={() => copyTextToClipboard(address)}
      type="button"
    >
      <Body2 colorClass={ColorClass.Secondary}>
        {shortenAddress(address, extraShort)}
      </Body2>
      <CopyIcon colorValue={ColorValue.Secondary} />
    </ShadowButton>
  );
}
