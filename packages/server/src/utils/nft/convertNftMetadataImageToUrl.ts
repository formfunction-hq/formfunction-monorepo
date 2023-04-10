import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getAssetCdnUrl from "formfn-shared/dist/utils/getAssetCdnUrl";
import getImgixUrl from "src/utils/getImgixUrl";
import isValidHttpUrl from "src/utils/isValidHttpUrl";
import { MetadataOffchainImageInput } from "src/__generated__/generated";

function extractNftImagePath(url: string) {
  if (url.includes("firebase")) {
    const match = url.match(/nft-images.*?\?/);
    if (match == null || match.length === 0) {
      return null;
    }

    return `nft-images/${match[0].replace("nft-images%2F", "").slice(0, -1)}`;
  }

  if (url.includes("https://cdn.formfunction.xyz/")) {
    return url.replace("https://cdn.formfunction.xyz/", "");
  }

  return null;
}

/**
 * In order to improve performance we optimize our assets
 * in the following way:
 *   * Images and GIFs < 1 second: use a third party service (Imgix)
 *   * GIFs >= 1 second: we asynchronously convert them to MP4 using a Cloud Function
 *       (see `formfn-cloud-functions` repo and nftMetadataGifToMp4Webhook)
 *   * Videos: serve them as-is through a CDN. Note that NFT images should be rendered
 *             using Mux (and not the URL returned from this function) if NftMetadata.videoPlaybackId is populated.
 *
 * For more information on this, read:
 * https://www.notion.so/formfunction/Design-Doc-Image-Video-Optimization-391324aed89f44e092af78de9c7a7d1e
 */
export default function convertNftMetadataImageToUrl(
  image: string,
  isOffPlatform: boolean,
  contentType: string,
  input?: Maybe<MetadataOffchainImageInput>
): string {
  // If offchain, just return the Arweave link directly
  if (isOffPlatform) {
    return image;
  }

  let imageName = image;

  // To make old image URLs in dev db load faster
  if (isValidHttpUrl(image)) {
    const extractedImagePath = extractNftImagePath(image);
    if (extractedImagePath != null) {
      imageName = extractedImagePath;
    } else {
      // Temporary code for backwards compatibility while we
      // migrate DB entries
      return image;
    }
  }

  if (contentType.includes("image")) {
    // We can use Imgix for all images, GIFs included
    return getImgixUrl(imageName, input);
  }

  // This is a video
  return getAssetCdnUrl(imageName);
}
