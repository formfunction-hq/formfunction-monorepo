import "@google/model-viewer";
import { CSSProperties } from "react";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface ModelViewerAttributes {
      autoplay: boolean;
      src: string;
      style: CSSProperties;
    }
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}

export type ModelViewerProps = {
  src: string;
};

export default function ModelViewer({ src }: ModelViewerProps) {
  return (
    <model-viewer
      autoplay
      camera-controls
      src={src}
      style={{ height: "100%", width: "100%" }}
    />
  );
}
