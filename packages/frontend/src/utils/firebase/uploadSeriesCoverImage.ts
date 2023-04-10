import getSeriesCoverImageStoragePath from "utils/firebase/storage-paths/getSeriesCoverImageStoragePath";
import uploadFile from "utils/firebase/uploadFile";
import getFileExt from "utils/getFileExt";

/**
 * Uploads series cover image to Firebase storage.
 *
 * @param file the file to upload.
 */
export default async function uploadSeriesCoverImage(file: File) {
  const path = getSeriesCoverImageStoragePath(getFileExt(file));

  return uploadFile(file, path);
}
