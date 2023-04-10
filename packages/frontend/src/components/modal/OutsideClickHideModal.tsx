import { RefObject, useRef } from "react";

import useOutsideClickHideModal from "hooks/useOutsideClickHideModal";

const EMPTY_ARRAY: Array<RefObject<HTMLElement>> = [];

/**
 * Component that hides a modal (should be itself) if you click outside of it.
 *
 * Also hides it if "escape" is pressed.
 */
export default function OutsideClickHideModal({
  children,
  className,
  excludeRefs,
  hideModal,
  onBackgroundOverlayOnly = false,
}: {
  children: any;
  className?: string;
  excludeRefs?: Array<RefObject<HTMLElement>>;
  hideModal: () => void;
  onBackgroundOverlayOnly?: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClickHideModal(
    wrapperRef,
    excludeRefs ?? EMPTY_ARRAY,
    hideModal,
    onBackgroundOverlayOnly
  );

  return (
    // position: static causes a bug when the viewer dropdown is expanded. Basically
    // this div acts like a flex item and moves the other flex items around.
    <div className={className} ref={wrapperRef}>
      {children}
    </div>
  );
}
