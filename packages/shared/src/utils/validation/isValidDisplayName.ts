import Filter from "bad-words";
const filter = new Filter();

export const MAX_DISPLAY_NAME_LENGTH = 30;

export default function isValidDisplayName(displayName: string): boolean {
  return (
    displayName.length <= MAX_DISPLAY_NAME_LENGTH &&
    !filter.isProfane(displayName)
  );
}
