import getProfilePhotoStoragePath from "utils/firebase/storage-paths/getProfilePhotoStoragePath";
import uploadFile from "utils/firebase/uploadFile";
import getFileExt from "utils/getFileExt";

/**
 * Uploads profile photo to Firebase storage.
 *
 * @param userId the user to upload for.
 * @param file the file to upload.
 * @return the download URL
 */
export default async function uploadProfilePhoto(
  userId: string,
  file: File
): Promise<string> {
  const path = getProfilePhotoStoragePath(userId, getFileExt(file));

  const { fileName } = await uploadFile(file, path);
  return fileName;
}
