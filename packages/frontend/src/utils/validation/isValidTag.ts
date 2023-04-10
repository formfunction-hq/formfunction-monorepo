export default function isValidTag(val: string) {
  return /^[a-zA-Z0-9]*$/.test(val) && val.length <= 12;
}
