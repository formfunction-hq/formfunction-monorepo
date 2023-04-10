export default function isEmptyObject(obj: { [key: string]: any }) {
  return Object.keys(obj).length === 0;
}
