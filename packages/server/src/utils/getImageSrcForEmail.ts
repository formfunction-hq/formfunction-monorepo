import { NftDisclosure, NftMetadata } from "@prisma/client";
import getAssetCdnUrl from "formfn-shared/dist/utils/getAssetCdnUrl";
import getImgixUrl from "src/utils/getImgixUrl";
import isValidHttpUrl from "src/utils/isValidHttpUrl";
import { NftDisclosureTypeExpress_Enum } from "src/__generated__/generated";

// See the resolveImage function in MetadataOffchainGqlType.ts for more details
// on how we serve and store different asset types (it's a bit complicated).
export default function getImageSrcForEmail(
  nftMetadata: NftMetadata,
  disclosures: Array<NftDisclosure>
) {
  if (
    disclosures
      .map(({ type }) => type)
      .includes(NftDisclosureTypeExpress_Enum.Nsfw)
  ) {
    return null;
  }

  // We switched to store the Firebase storage image path, but some old DB entries
  // still contain URLs.
  if (isValidHttpUrl(nftMetadata.image)) {
    return nftMetadata.image;
  }

  if (nftMetadata.videoPlaybackId != null) {
    // Conditionally displaying an img vs. video in an email is hard, so for videos,
    // we link to a GIF instead.
    return `https://image.mux.com/${nftMetadata.videoPlaybackId}/animated.gif?width=640`;
  }

  if (nftMetadata.contentType.includes("image")) {
    // We should serve images with imgix.
    return getImgixUrl(nftMetadata.image);
  }

  // For GIFs/videos, we serve directly from our CDN (and not from imgix).
  return getAssetCdnUrl(nftMetadata.image);
}
