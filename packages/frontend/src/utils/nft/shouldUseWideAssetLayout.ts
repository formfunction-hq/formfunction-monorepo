import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";

/**
 * We display wide assets with a different layout.
 */
export default function shouldUseWideAssetLayout(
  assetHeight: MaybeUndef<number>,
  assetWidth: MaybeUndef<number>
) {
  if (assetHeight == null || assetWidth == null) {
    return false;
  }

  return assetWidth > assetHeight * 1.3;
}
