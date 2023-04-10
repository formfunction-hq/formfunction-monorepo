import { useEffect } from "react";

export default function useArrowNav(
  onRightArrow: () => void,
  onLeftArrow: () => void,
  shouldSkip = false
) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.repeat || shouldSkip) {
        return;
      }

      if (event.key === "ArrowRight") {
        onRightArrow();
      }
      if (event.key === "ArrowLeft") {
        onLeftArrow();
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, [onRightArrow, onLeftArrow, shouldSkip]);
}
