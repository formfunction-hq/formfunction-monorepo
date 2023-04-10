export default function getContentTypeFromExt(ext: string) {
  switch (ext) {
    case "gif":
      return "image/gif";
    case "glb":
      return "model/gltf-binary";
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpg";
    case "mp4":
      return "video/mp4";
    case "html":
      return "text/html";
    default:
      return "unknown";
  }
}
