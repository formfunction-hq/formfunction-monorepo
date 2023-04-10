import { nanoid } from "nanoid";

export default function getProfilePhotoStoragePath(
  userId: string,
  ext: string
): string {
  return `/users/${userId}/images/profilePhoto-${nanoid()}.${ext}`;
}
