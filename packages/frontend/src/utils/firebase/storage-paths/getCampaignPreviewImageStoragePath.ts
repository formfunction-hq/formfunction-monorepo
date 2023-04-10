import { nanoid } from "nanoid";
import getFileExt from "utils/getFileExt";

export default function getCampaignPreviewImageStoragePath(
  userId: string,
  file: File
): string {
  return `/users/${userId}/images/campaign/preview/asset-${nanoid()}.${getFileExt(
    file
  )}`;
}
