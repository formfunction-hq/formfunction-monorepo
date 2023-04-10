export default function getDashCasedString(str: string, delim = " ") {
  // Match anything that is not a-z, A-Z, or non-digit and non-whitespace
  // and replace with ""
  const cleanedStr = str.replace(/[^a-zA-Z0-9 ]/g, "");
  const dashCased = cleanedStr.toLowerCase().split(delim).join("-");
  const noConsecutiveDashes = dashCased
    .replace(/[-]{2,}/g, "-")
    // Can't start with -
    .replace(/^[-]/g, "")
    // Can't end with -
    .replace(/[-]$/g, "");

  return noConsecutiveDashes;
}
