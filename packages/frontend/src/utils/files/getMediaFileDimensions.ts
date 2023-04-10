import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import Dimensions from "types/Dimensions";
import getImageDimensions from "utils/getImageDimensions";
import getVideoDimensions from "utils/getVideoDimensions";

export default async function getMediaFileDimensions(
  file: File,
  fileDataUrl: string
): Promise<Maybe<Dimensions>> {
  if (file.type.includes("video")) {
    return getVideoDimensions(fileDataUrl);
  }
  if (file.type.includes("image")) {
    return getImageDimensions(fileDataUrl);
  }
  return null;
}
