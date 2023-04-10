/**
 * The mapping between ContentTypeForFilters and an actual content type value (like image/gif) is defined in getContentTypesForContentTypeForFilters.
 *
 * The mapping is 1:many between ContentTypeForFilters and actual content types. This is because people don't care about filtering by exact content types
 * like image/jpeg and image/png—they care about higher level things, like filtering on static images vs. animated gifs and videos.
 */
enum ContentTypeForFilters {
  Animated = "Animated",
  Images = "Images",
}

export default ContentTypeForFilters;
