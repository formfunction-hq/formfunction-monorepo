import styles from "css/images/NftAssetQuestionMark.module.css";
import NftAssetSize from "types/enums/NftAssetSize";
import { getJoinedClassName } from "components/images/NftAsset";
import joinClasses from "utils/joinClasses";
import ColorClass from "types/enums/ColorClass";
import BackgroundColorClass from "types/enums/BackgroundColorClass";
import Header1 from "components/text/Header1";

type Props = {
  className?: string;
  noBorderRadius?: boolean;
  showBorder?: boolean;
  showDropShadow?: boolean;
  showShimmer?: boolean;
  size?: NftAssetSize;
};

export default function NftAssetQuestionMark({
  className,
  noBorderRadius = false,
  showBorder = false,
  showDropShadow = false,
  showShimmer = true,
  size = NftAssetSize.Size48,
}: Props): JSX.Element {
  const joinedClassName = getJoinedClassName({
    className,
    noBorderRadius,
    showBorder,
    showDropShadow,
    showShimmer,
    size,
  });

  return (
    <div
      className={joinClasses(
        joinedClassName,
        styles.container,
        BackgroundColorClass.Tertiary
      )}
    >
      <Header1 colorClass={ColorClass.BrightPurple}>?</Header1>
    </div>
  );
}
