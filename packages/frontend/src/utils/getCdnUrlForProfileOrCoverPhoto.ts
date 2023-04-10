import getAssetCdnUrl from "formfn-shared/dist/utils/getAssetCdnUrl";
import getImgixUrl from "utils/getImgixUrl";

export default function getCdnUrlForProfileOrCoverPhoto(
  filePath: string
): string {
  if (filePath.endsWith(".gif")) {
    // For GIFs, imgix does not do any optimization
    // so we return from our CDN
    return getAssetCdnUrl(filePath);
  }

  // For regular images, we can utilize imgix optimization
  return getImgixUrl(filePath);
}
