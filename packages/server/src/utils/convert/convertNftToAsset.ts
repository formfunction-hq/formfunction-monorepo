import { Nft, NftMetadata } from "@prisma/client";
import Typename from "src/types/enums/Typename";
import getImageUrlForNftMetadata from "src/utils/nft/getImageUrlForNftMetadata";
import { AssetExpress } from "src/__generated__/generated";

export default function convertNftToAsset(
  nft: Nft & {
    NftMetadata: NftMetadata;
  }
): AssetExpress {
  const { assetHeight, assetWidth } = nft.NftMetadata;

  return {
    __typename: Typename.Asset,
    contentType: nft.NftMetadata.contentType,
    dimensions:
      assetHeight != null && assetWidth != null
        ? {
            __typename: Typename.AssetDimensions,
            height: assetHeight,
            width: assetWidth,
          }
        : null,
    downloadUrl: getImageUrlForNftMetadata(nft.NftMetadata),
    id: `nftAsset-${nft.mint}`,
    path: nft.NftMetadata.image,
    videoPlaybackId: nft.NftMetadata.videoPlaybackId,
  };
}
