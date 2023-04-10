import { RefObject, useEffect } from "react";

import ElementId from "types/enums/ElementId";

const ESCAPE = "Escape";
const KEYUP = "keyup";
const MOUSEUP = "mouseup";

/**
 * A custom hook that, when the user clicks outside the element (the modal)
 * contained by the ref, executes a hideModal function.
 *
 * Also executes hideModal if "escape" is pressed.
 */
export default function useOutsideClickHideModal(
  ref: RefObject<HTMLDivElement>,
  excludeRefs: Array<RefObject<HTMLElement>>,
  hideModal: () => void,
  onBackgroundOverlayOnly: boolean
) {
  useEffect(() => {
    // Hide modal if a click occurs outside the referenced element's child.
    const handleClickOutside = (event: MouseEvent) => {
      const inAnyExcludeRef = excludeRefs.some((excludeRef) =>
        !excludeRef.current || !("contains" in excludeRef.current)
          ? false
          : excludeRef.current.contains(event.target as Node)
      );
      if (inAnyExcludeRef) {
        return;
      }

      if (
        (!onBackgroundOverlayOnly &&
          ref.current &&
          !ref.current.contains(event.target as Node)) ||
        (event.target instanceof HTMLElement &&
          event.target.id === ElementId.BackgroundOverlay)
      ) {
        hideModal();
      }
    };

    // Hide modal if the "escape" key is pressed.
    function handleKeyUp(event: KeyboardEvent) {
      if (event.key === ESCAPE) {
        hideModal();
      }
    }

    // Bind the click event listener
    document.addEventListener(MOUSEUP, handleClickOutside);

    // Bind the keyboard event listener
    document.addEventListener(KEYUP, handleKeyUp);

    // Cleanup
    return () => {
      // Unbind the event listeners on clean up
      document.removeEventListener(MOUSEUP, handleClickOutside);
      document.removeEventListener(KEYUP, handleKeyUp);
    };
  }, [excludeRefs, hideModal, ref, onBackgroundOverlayOnly]);
}
