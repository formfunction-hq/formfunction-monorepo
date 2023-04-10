import useDimensions from "hooks/useDimensions";

// Returns dimensions of the viewport which includes things like
// scrollbar width
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    height,
    width,
  };
}

export default function useWindowDimensions(): {
  height: number;
  width: number;
} {
  return useDimensions(getWindowDimensions);
}
