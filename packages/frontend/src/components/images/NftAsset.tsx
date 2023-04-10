import Video from "components/videos/Video";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import styles from "css/images/NftAsset.module.css";
import NftAssetSize from "types/enums/NftAssetSize";
import joinClasses from "utils/joinClasses";
import MaybeImgix from "components/images/MaybeImgix";
import { CSSProperties } from "react";

const NFT_ASSET_SIZE_TO_CLASS: { [key in NftAssetSize]: string } = {
  [NftAssetSize.Size32]: styles.size32,
  [NftAssetSize.Size48]: styles.size48,
  [NftAssetSize.Size64]: styles.size64,
  [NftAssetSize.Size72]: styles.size72,
  [NftAssetSize.Size96]: styles.size96,
  [NftAssetSize.Size120]: styles.size120,
  [NftAssetSize.Size188]: styles.size188,
  [NftAssetSize.Size234]: styles.size234,
  [NftAssetSize.Size320]: styles.size320,
  [NftAssetSize.Size480]: styles.size480,
  [NftAssetSize.Size588]: styles.size588,

  [NftAssetSize.Size100Percent]: styles.size100Percent,
};

const NFT_ASSET_SIZE_TO_WIDTH: { [key in NftAssetSize]: number | string } = {
  [NftAssetSize.Size32]: 32,
  [NftAssetSize.Size48]: 48,
  [NftAssetSize.Size64]: 64,
  [NftAssetSize.Size72]: 72,
  [NftAssetSize.Size96]: 96,
  [NftAssetSize.Size120]: 120,
  [NftAssetSize.Size188]: 188,
  [NftAssetSize.Size234]: 234,
  [NftAssetSize.Size320]: 320,
  [NftAssetSize.Size480]: 480,
  [NftAssetSize.Size588]: 588,
  [NftAssetSize.Size100Percent]: "100%",
};

export function getJoinedClassName({
  size,
  noBorderRadius,
  showBorder,
  showDropShadow,
  showShimmer,
  className,
}: {
  className?: string;
  noBorderRadius: boolean;
  showBorder: boolean;
  showDropShadow: boolean;
  showShimmer: boolean;
  size: NftAssetSize;
}): string {
  const noBorderRadiusClassName = noBorderRadius
    ? styles.noBorderRadius
    : undefined;
  return joinClasses(
    styles.photo,
    NFT_ASSET_SIZE_TO_CLASS[size],
    noBorderRadiusClassName,
    showBorder ? styles.border : undefined,
    showDropShadow ? styles.dropShadow : undefined,
    showShimmer ? styles.shimmer : undefined,
    className
  );
}

type Props = {
  assetSrc: string;
  border?: CSSProperties["border"];
  className?: string;
  contentType: string;
  link?: string;
  noBorderRadius?: boolean;
  playbackId?: string;
  showBorder?: boolean;
  showDropShadow?: boolean;
  showShimmer?: boolean;
  size?: NftAssetSize;
};

export default function NftAsset({
  assetSrc,
  border,
  className,
  contentType,
  link,
  noBorderRadius = false,
  playbackId,
  showBorder = false,
  showDropShadow = false,
  showShimmer = true,
  size = NftAssetSize.Size48,
}: Props): JSX.Element {
  const noBorderRadiusClassName = noBorderRadius
    ? styles.noBorderRadius
    : undefined;
  const joinedClassName = getJoinedClassName({
    className,
    noBorderRadius,
    showBorder,
    showDropShadow,
    showShimmer,
    size,
  });
  const joinedShimmerClassName = joinClasses(
    noBorderRadiusClassName,
    NFT_ASSET_SIZE_TO_CLASS[size]
  );
  const width = NFT_ASSET_SIZE_TO_WIDTH[size];
  const style = { border };

  const body = contentType.includes("video") ? (
    <Video
      showShimmer={showShimmer}
      shimmerClassName={joinedShimmerClassName}
      className={joinedClassName}
      playbackId={playbackId}
      src={assetSrc}
      style={style}
    />
  ) : (
    <MaybeImgix
      showShimmer={showShimmer}
      shimmerClassName={joinedShimmerClassName}
      src={assetSrc}
    >
      <Imgix
        className={joinedClassName}
        src={assetSrc}
        htmlAttributes={{ style }}
        // Pass in double the width to avoid blurriness
        // Using 1000 for NftAssetSize.Size100Percent as an arbitrary width
        width={typeof width === "string" ? 1000 : width * 2}
      />
      <img className={joinedClassName} src={assetSrc} style={style} />
    </MaybeImgix>
  );

  return link ? <Link to={link}>{body}</Link> : body;
}
