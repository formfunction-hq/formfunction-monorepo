import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import Dimensions from "types/Dimensions";
import getMediaFileDimensions from "utils/files/getMediaFileDimensions";

/**
 * Uploads a file to Firebase storage.
 *
 * @param file the file to upload.
 * @param path the path to upload it at.
 * @return the download URL and the file name
 */
export default async function uploadFile(
  file: File,
  path: string
): Promise<{
  dimensions: Maybe<Dimensions>;
  downloadUrl: string;
  fileName: string;
  type: string;
}> {
  const storageRef = ref(getStorage(), path);
  const uploadResult = await uploadBytes(storageRef, file);
  const fileDataUrl = URL.createObjectURL(file);
  const dimensions = await getMediaFileDimensions(file, fileDataUrl);

  return {
    dimensions,
    downloadUrl: await getDownloadURL(uploadResult.ref),
    fileName: uploadResult.metadata.fullPath,
    type: file.type,
  };
}
