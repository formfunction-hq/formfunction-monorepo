import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";

export default function isFileVideo(file: MaybeUndef<File>): boolean {
  return file?.type.includes("video/") ?? false;
}
