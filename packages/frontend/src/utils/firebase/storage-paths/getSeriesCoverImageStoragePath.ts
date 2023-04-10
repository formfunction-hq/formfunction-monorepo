import { nanoid } from "nanoid";

export default function getSeriesCoverImageStoragePath(ext: string): string {
  return `/series-images/coverImage-${nanoid()}.${ext}`;
}
