export default function getNftMetadataFileProperties(
  files: Array<{ type: string; uri: string }>
) {
  if (files.length === 0) {
    return {
      properties: {
        files: [],
      },
    };
  }

  return {
    animation_url: files[0].type.includes("video") ? files[0].uri : undefined,
    properties: {
      files,
    },
  };
}
