import Typename from "src/types/enums/Typename";
import { AssetExpress } from "src/__generated__/generated";
import { Photo } from "@prisma/client";
import getContentTypeFromFilename from "formfn-shared/dist/utils/getContentTypeFromFilename";

export default function convertPhotoToAsset(prismaPhoto: Photo): AssetExpress {
  return {
    __typename: Typename.Asset,
    contentType: getContentTypeFromFilename(prismaPhoto.storagePath ?? ""),
    downloadUrl: prismaPhoto.photoUrl,
    id: prismaPhoto.id,
    path: prismaPhoto.storagePath ?? "",
  };
}
