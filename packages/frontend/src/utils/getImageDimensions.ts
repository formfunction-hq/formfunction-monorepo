import Dimensions from "types/Dimensions";

export default async function getImageDimensions(
  dataUri: string
): Promise<Dimensions> {
  return new Promise((resolve) => {
    const i = new Image();
    i.onload = function () {
      resolve({ height: i.height, width: i.width });
    };
    i.src = dataUri;
  });
}
