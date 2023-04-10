import getCoverPhotoStoragePath from "utils/firebase/storage-paths/getCoverPhotoStoragePath";
import uploadFile from "utils/firebase/uploadFile";
import getFileExt from "utils/getFileExt";

/**
 * Uploads cover photo to Firebase storage.
 *
 * @param userId the user to upload for.
 * @param file the file to upload.
 * @return the download URL
 */
export default async function uploadCoverPhoto(
  userId: string,
  file: File
): Promise<string> {
  const path = getCoverPhotoStoragePath(userId, getFileExt(file));

  const { fileName } = await uploadFile(file, path);
  return fileName;
}
