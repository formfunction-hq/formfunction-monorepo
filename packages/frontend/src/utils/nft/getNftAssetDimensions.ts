import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import getResponsiveContainerWidth from "utils/getResponsiveContainerWidth";
import shouldUseWideAssetLayout from "utils/nft/shouldUseWideAssetLayout";

// Keep in sync with NftPageContent.module.css
function getLeftSideWidth(windowWidth: number) {
  if (windowWidth > 1640) {
    return 700;
  }

  if (windowWidth > 1536) {
    return 600;
  }

  if (windowWidth > 1280) {
    return 543;
  }

  if (windowWidth > 1000) {
    return 440;
  }

  if (windowWidth > 980) {
    return 400;
  }

  return null;
}

/**
 * Gets the dimensions with which the NFT's asset (image or video) should be displayed.
 */
export default function getNftAssetDimensions(
  assetHeight: MaybeUndef<number>,
  assetWidth: MaybeUndef<number>,
  windowHeight: number,
  windowWidth: number,
  documentWidth: number
) {
  if (assetHeight == null || assetWidth == null) {
    return null;
  }

  const isWideAsset = shouldUseWideAssetLayout(assetHeight, assetWidth);
  const responsiveContainerWidth = getResponsiveContainerWidth(
    documentWidth,
    windowWidth
  );

  // In this layout, the asset is displayed on top
  if (isWideAsset) {
    // 0.7 * windowHeight is the max height an asset can be displayed at
    const heightByHeight = Math.min(assetHeight, 0.7 * windowHeight);
    const widthByHeight = assetWidth * (heightByHeight / assetHeight);

    if (widthByHeight <= responsiveContainerWidth) {
      // First, try prioritizing the height of the asset. If this makes
      // the width too large for the screen, we fall back to 100% width
      return { height: heightByHeight, width: widthByHeight };
    }

    const heightByWidth = assetHeight * (responsiveContainerWidth / assetWidth);
    return { height: heightByWidth, width: "100%" };
  }

  // In this layout, the asset is displayed on the left
  const leftSideWidth = getLeftSideWidth(windowWidth);
  const heightByWidth =
    assetHeight * ((leftSideWidth ?? responsiveContainerWidth) / assetWidth);
  return {
    height: heightByWidth,
    width: leftSideWidth ?? "100%",
  };
}
