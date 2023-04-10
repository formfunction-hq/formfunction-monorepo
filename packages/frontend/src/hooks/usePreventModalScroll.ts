import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { useEffect } from "react";
import ElementId from "types/enums/ElementId";

/**
 * Prevent scrolling on modal with given id when `shouldPrevent`
 * is true. Automatically handles changes in padding from scroll bar
 * appearing/disappering.
 *
 * IMPORTANT: modalId *must* be set as the id of the scrollable container
 *   on the modal being used.
 */
export default function usePreventModalScroll(
  shouldPrevent: boolean,
  modalId: ElementId
) {
  useEffect(() => {
    const modal = document.getElementById(modalId)!;
    if (modal == null) {
      return emptyFunction;
    }

    const { clientWidth: widthWithScrollBar } = modal;
    const originalRightPadding = window
      .getComputedStyle(modal, null)
      .getPropertyValue("padding-right");
    const paddingValue = parseInt(originalRightPadding.split("px")[0], 10);

    if (shouldPrevent) {
      modal.style.overflowY = "hidden";
      const { clientWidth: widthWithoutScrollBar } = modal;
      modal.style.paddingRight = `${
        paddingValue + widthWithoutScrollBar - widthWithScrollBar
      }px`;
    } else {
      modal.style.overflowY = "unset";
      modal.style.paddingRight = originalRightPadding;
    }

    return () => {
      modal.style.overflowY = "unset";
      modal.style.paddingRight = originalRightPadding;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldPrevent]);
}
