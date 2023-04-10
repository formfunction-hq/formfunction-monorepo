import MediaType from "types/enums/MediaType";
import MediaTypeOrUnknown from "types/MediaTypeOrUnknown";
import getFileExt from "utils/getFileExt";

export default function getFileMediaType(file: File): MediaTypeOrUnknown {
  if (getFileExt(file) === "glb") {
    return MediaType.ModelGltfBinary;
  }

  if (Object.values(MediaType).includes(file.type as MediaType)) {
    return file.type as MediaType;
  }

  return "unknown";
}
