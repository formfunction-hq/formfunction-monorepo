import styles from "css/pages/common/nft/kind-label/NftKindLabel.module.css";
import ColorValue from "types/enums/ColorValue";
import ColorClass from "types/enums/ColorClass";
import Body1 from "components/text/Body1";
import StarIcon from "components/icons/StarIcon";

export default function OneOfOneKindLabel() {
  return (
    <div className={styles.label}>
      <StarIcon colorValue={ColorValue.Primary} size={24} />
      <Body1 colorClass={ColorClass.Primary}>1 / 1 piece</Body1>
    </div>
  );
}
