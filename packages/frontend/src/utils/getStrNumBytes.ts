const enc = new TextEncoder();

export default function getStrNumBytes(str: string) {
  return enc.encode(str).length;
}
