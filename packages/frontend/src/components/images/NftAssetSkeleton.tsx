import NftAssetSize from "types/enums/NftAssetSize";
import Skeleton from "react-loading-skeleton";
import { getJoinedClassName } from "components/images/NftAsset";

type Props = {
  className?: string;
  noBorderRadius?: boolean;
  showBorder?: boolean;
  showDropShadow?: boolean;
  showShimmer?: boolean;
  size?: NftAssetSize;
};

export default function NftAssetSkeleton({
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

  return <Skeleton className={joinedClassName} />;
}
