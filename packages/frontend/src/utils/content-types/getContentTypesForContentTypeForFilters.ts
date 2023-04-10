import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import ContentTypeForFilters from "types/enums/ContentTypeForFilters";

export default function getContentTypesForContentTypeForFilters(
  contentTypeForFilters: ContentTypeForFilters
): Array<string> {
  switch (contentTypeForFilters) {
    case ContentTypeForFilters.Animated:
      return ["image/gif", "video/mp4"];
    case ContentTypeForFilters.Images:
      return ["image/png", "image/jpeg", "image/jpg"];
    default:
      return assertUnreachable(contentTypeForFilters);
  }
}
