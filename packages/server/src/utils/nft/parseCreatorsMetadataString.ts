import CreatorOnchain from "src/types/CreatorOnchain";

export default function parseCreatorsMetadataString(str: string) {
  try {
    return JSON.parse(str) as Array<CreatorOnchain>;
  } catch {
    return null;
  }
}
