export default function stringLast(str: string) {
  if (str.length === 0) {
    return "";
  }
  return str[str.length - 1];
}
