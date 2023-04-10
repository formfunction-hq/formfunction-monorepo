import { nanoid } from "nanoid";

export default function getCoverPhotoStoragePath(
  userId: string,
  ext: string
): string {
  return `/users/${userId}/images/coverPhoto-${nanoid()}.${ext}`;
}
