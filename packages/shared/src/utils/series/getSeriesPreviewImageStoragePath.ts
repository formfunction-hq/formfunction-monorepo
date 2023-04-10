import { nanoid } from "nanoid";

export default function getSeriesPreviewImageStoragePath(ext: string): string {
  return `/series-images/previewImage-${nanoid()}.${ext}`;
}
