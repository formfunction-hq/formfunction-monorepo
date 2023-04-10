import getSeriesPreviewImageStoragePath from "formfn-shared/dist/utils/series/getSeriesPreviewImageStoragePath";
import uploadFile from "utils/firebase/uploadFile";
import getFileExt from "utils/getFileExt";

/**
 * Uploads series preview image to Firebase storage.
 *
 * @param file the file to upload.
 */
export default async function uploadSeriesPreviewImage(file: File) {
  const path = getSeriesPreviewImageStoragePath(getFileExt(file));

  return uploadFile(file, path);
}
