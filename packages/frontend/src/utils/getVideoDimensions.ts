import Dimensions from "types/Dimensions";

export default async function getVideoDimensions(
  dataUri: string
): Promise<Dimensions> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.addEventListener(
      "loadedmetadata",
      function () {
        const height = this.videoHeight;
        const width = this.videoWidth;
        resolve({ height, width });
      },
      false
    );
    video.src = dataUri;
  });
}
