import { NftMetadata } from "@prisma/client";
import convertNftMetadataImageToUrl from "src/utils/nft/convertNftMetadataImageToUrl";

export default function getImageSrcForNftMetadata(nftMetadata: NftMetadata) {
  return convertNftMetadataImageToUrl(
    nftMetadata.image,
    false, // isOffPlatform
    nftMetadata.contentType
  );
}
