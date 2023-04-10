import { nanoid } from "nanoid";
import getFileExt from "utils/getFileExt";

export default function getCampaignGalleryImageStoragePath(
  userId: string,
  file: File
): string {
  return `/users/${userId}/images/campaign/gallery/asset-${nanoid()}.${getFileExt(
    file
  )}`;
}
