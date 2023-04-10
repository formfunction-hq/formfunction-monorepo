import HUMAN_READABLE_MEDIA_TYPE from "constants/HumanReadableMediaType";
import MediaType from "types/enums/MediaType";
import MediaTypeOrExtension from "types/MediaTypeOrExtension";

export default function getHumanReadableMediaTypeOrExtension(
  mediaType: MediaTypeOrExtension
) {
  return mediaType in HUMAN_READABLE_MEDIA_TYPE
    ? HUMAN_READABLE_MEDIA_TYPE[mediaType as MediaType]
    : // Remove period
      mediaType.slice(1);
}
