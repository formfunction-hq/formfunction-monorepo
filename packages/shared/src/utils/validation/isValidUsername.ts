// Usernames can only contain alphanumerics, underscores, and periods.
//
// There cannot be consecutive periods. There must be an alphanumeric/underscore after
// each period.
import Filter from "bad-words";

const REGEX = /^[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*$/;

const filter = new Filter();

export default function isValidUsername(username: string): boolean {
  return (
    username.length > 3 && REGEX.test(username) && !filter.isProfane(username)
  );
}
