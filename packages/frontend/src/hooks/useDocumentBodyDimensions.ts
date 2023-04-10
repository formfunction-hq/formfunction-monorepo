import useDimensions from "hooks/useDimensions";

// Returns dimensions of document.body which does not include things like
// scrollbar width
function getDocumentBodyDimensions() {
  const { clientWidth: width, clientHeight: height } = document.body;
  return {
    height,
    width,
  };
}

export default function useDocumentBodyDimensions(): {
  height: number;
  width: number;
} {
  return useDimensions(getDocumentBodyDimensions);
}
