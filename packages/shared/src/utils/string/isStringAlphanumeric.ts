export default function isStringAlphanumeric(str: string) {
  return /^[a-zA-Z0-9]*$/i.test(str);
}
