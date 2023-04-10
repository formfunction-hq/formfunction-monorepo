import { nanoid } from "nanoid";

export default function getArtistSubmissionAssetStoragePath(
  userId: string,
  ext: string
): string {
  return `/users/${userId}/images/submission/asset-${nanoid()}.${ext}`;
}
