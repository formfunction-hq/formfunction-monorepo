// Only works for objects that are serializable.
// See https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy for more info.
export default function deepCopySerializable<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
