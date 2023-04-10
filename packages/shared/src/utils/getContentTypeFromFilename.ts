import getContentTypeFromExt from "utils/getContentTypeFromExt";

export default function getContentTypeFromFilename(filename: string) {
  const ext = (filename.split(".").pop() || "").toLowerCase();
  return getContentTypeFromExt(ext);
}
