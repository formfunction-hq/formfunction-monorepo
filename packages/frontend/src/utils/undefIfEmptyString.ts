export default function undefIfEmptyString(str: string) {
  return str.length === 0 ? undefined : str;
}
