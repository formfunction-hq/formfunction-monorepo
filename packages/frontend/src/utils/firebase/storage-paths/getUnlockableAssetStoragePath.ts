import { nanoid } from "nanoid";

export default function getUnlockableAssetStoragePath(
  userId: string,
  ext: string
): string {
  return `/users/${userId}/images/unlockables/asset-${nanoid()}.${ext}`;
}
