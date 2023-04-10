import MediaType from "types/enums/MediaType";

const HUMAN_READABLE_MEDIA_TYPE: Record<MediaType, string> = {
  [MediaType.ImageGif]: "gif",
  [MediaType.ImageJpg]: "jpeg",
  [MediaType.ImageJpeg]: "jpeg",
  [MediaType.ImagePng]: "png",
  [MediaType.ModelGltfBinary]: "glb",
  [MediaType.TextHtml]: "html",
  [MediaType.VideoMp4]: "mp4",
  [MediaType.VideoQuicktime]: "mov",
};

export default HUMAN_READABLE_MEDIA_TYPE;
