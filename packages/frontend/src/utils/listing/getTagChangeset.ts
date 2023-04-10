export default function getTagChangeset(
  tags: Array<string>,
  originalTags: Array<string>
) {
  const deletedTags = originalTags.filter((tag) => !tags.includes(tag));
  const newTags = tags.filter((tag) => !originalTags.includes(tag));

  return { deletedTags, newTags };
}
