import Typename from "src/types/enums/Typename";
import { AssetExpress } from "src/__generated__/generated";
import { Asset } from "@prisma/client";
import getImgixUrl from "src/utils/getImgixUrl";

export default function convertAsset(prismaAsset: Asset): AssetExpress {
  return {
    __typename: Typename.Asset,
    contentType: prismaAsset.contentType,
    dimensions:
      prismaAsset.height == null || prismaAsset.width == null
        ? null
        : {
            __typename: Typename.AssetDimensions,
            height: prismaAsset.height,
            width: prismaAsset.width,
          },
    downloadUrl: getImgixUrl(prismaAsset.path),
    id: prismaAsset.id,
    path: prismaAsset.path,
    videoPlaybackId: prismaAsset.videoPlaybackId,
  };
}
