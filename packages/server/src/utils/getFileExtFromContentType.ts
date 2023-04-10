export default function getFileExtFromContentType(contentType: string) {
  const splits = contentType.split("/");
  if (splits.length === 0) {
    return null;
  }
  // TODO: make more robust
  return splits[splits.length - 1];
}
