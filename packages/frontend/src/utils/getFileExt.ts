export default function getFileExt(file: File): string {
  return file.name.split(".").pop() || "";
}
