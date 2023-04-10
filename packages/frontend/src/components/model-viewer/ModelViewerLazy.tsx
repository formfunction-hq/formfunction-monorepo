import { ModelViewerProps } from "components/model-viewer/ModelViewer";
import { lazy, Suspense } from "react";

const ModelViewer = lazy(() => import("components/model-viewer/ModelViewer"));

export default function ModelViewerLazy(props: ModelViewerProps) {
  return (
    <Suspense fallback={null}>
      <ModelViewer {...props} />
    </Suspense>
  );
}
