import { useState, useEffect } from "react";

// From https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
export default function useDimensions(
  getDimensions: () => { height: number; width: number }
): {
  height: number;
  width: number;
} {
  const [dimensions, setDimensions] = useState(getDimensions());

  useEffect(() => {
    function handleResize() {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getDimensions]);

  return dimensions;
}
