import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";

export default function isFileImage(file: MaybeUndef<File>): boolean {
  return file?.type.includes("image/") ?? false;
}
