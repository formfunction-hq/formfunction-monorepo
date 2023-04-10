import PlainButton from "components/buttons/PlainButton";
import EllipsisIcon from "components/icons/EllipsisIcon";
import styles from "css/buttons/EllipsisShadowButton.module.css";
import ColorValue from "types/enums/ColorValue";

type Props = {
  onClick: () => void;
};

export default function EllipsisShadowButton({ onClick }: Props): JSX.Element {
  return (
    <PlainButton
      className={styles.button}
      onClick={onClick}
      transparentBg={false}
    >
      <EllipsisIcon colorValue={ColorValue.Primary} />
    </PlainButton>
  );
}
