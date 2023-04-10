import MediaType from "types/enums/MediaType";
import MediaTypeOrUnknown from "types/MediaTypeOrUnknown";

export default function stringToMediaType(
  mediaType: string
): MediaTypeOrUnknown {
  if (Object.values(MediaType).includes(mediaType as MediaType)) {
    return mediaType as MediaType;
  }

  return "unknown";
}
