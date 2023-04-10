// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
import URL from "url";

export default function isValidHttpUrl(str: string) {
  let url;

  try {
    url = new URL.URL(str);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
