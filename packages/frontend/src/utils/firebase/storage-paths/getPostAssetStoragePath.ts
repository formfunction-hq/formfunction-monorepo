import { nanoid } from "nanoid";
import getFileExt from "utils/getFileExt";

export default function getPostAssetStoragePath(file: File): string {
  return `/posts/asset-${nanoid()}.${getFileExt(file)}`;
}
