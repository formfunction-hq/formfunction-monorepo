export default function getNftToTagObjects(
  newTags: Array<string>,
  mint: string
) {
  return newTags.map((tag) => ({
    Tag: {
      data: { value: tag.trim().toLowerCase() },
      on_conflict: {
        constraint: "Tag_value_key" as const,
        update_columns: ["value"] as const,
      },
    },
    nftId: mint,
  }));
}
