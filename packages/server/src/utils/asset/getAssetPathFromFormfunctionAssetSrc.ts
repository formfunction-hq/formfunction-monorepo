import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import FIREBASE_STORAGE_BASE_URI from "src/constants/FirebaseStorageBaseUri";
import IMGIX_STORAGE_BASE_URI from "src/constants/ImgixStorageBaseUri";

export default function getAssetPathFromFormfunctionAssetSrc(
  assetSrc: string
): Maybe<string> {
  return assetSrc != null
    ? assetSrc.split(FIREBASE_STORAGE_BASE_URI)[1] ||
        assetSrc.split(IMGIX_STORAGE_BASE_URI)[1]
    : null;
}
