import { Popover } from "antd";
import SearchIcon from "components/icons/SearchIcon";
import LoadingSpinner from "components/loading/LoadingSpinner";
import TinyLabel from "components/text/TinyLabel";
import styles from "css/series/SeriesNftSearch.module.css";
import { RefObject, Suspense, useEffect, useRef, useState } from "react";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import FontClass from "types/enums/FontClass";
import joinClasses from "utils/joinClasses";
import HIGHER_THAN_MODAL_Z_INDEX from "constants/HigherThanModalZIndex";
import ElementId from "types/enums/ElementId";
import usePreventModalScroll from "hooks/usePreventModalScroll";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

function PopoverContentInner({
  searchResults,
}: {
  searchResults: Array<JSX.Element>;
}): JSX.Element {
  return (
    <div className={styles.popoverContentInner}>
      {searchResults.length === 0 ? (
        <TinyLabel colorClass={ColorClass.Secondary} textTransform="uppercase">
          No Results
        </TinyLabel>
      ) : (
        <div className={styles.popoverSection}>{searchResults}</div>
      )}
    </div>
  );
}

function PopoverContent({
  visible,
  debouncedSearchText,
  searchText,
  searchResults,
  elementId,
}: {
  debouncedSearchText: string;
  elementId: ElementId;
  searchResults: Array<JSX.Element>;
  searchText: string;
  visible: boolean;
}): JSX.Element {
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const [originalWidth, setOriginalWidth] = useState<Maybe<string>>(null);

  // Dynamically adjust the width to account for scrollbar width on desktop modal.
  // NOTE: this is not as easily done on BottomDrawer due to `Drawer` scrolling on
  // the library component's body rather than our own. This should be okay as
  // scrollbars don't show on mobile browsers which is mostly what Drawer is intended for.
  useEffect(() => {
    if (popoverContentRef == null || popoverContentRef.current == null) {
      return;
    }
    const modal = document.getElementById(elementId)!;
    const { clientWidth, offsetWidth } = modal ?? {};
    const scrollBarWidth = offsetWidth - clientWidth;
    let originalWidthInner: Maybe<string> = originalWidth;
    if (originalWidthInner == null) {
      originalWidthInner = window
        .getComputedStyle(popoverContentRef.current, null)
        .getPropertyValue("width");
      setOriginalWidth(originalWidthInner);
    }
    const widthValue = parseInt(originalWidthInner.split("px")[0], 10);
    popoverContentRef.current.style.setProperty(
      "width",
      `${widthValue - scrollBarWidth}px`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <div ref={popoverContentRef} className={styles.popoverContent}>
      <Suspense
        fallback={<LoadingSpinner colorValue={ColorValue.BrightPurple} />}
      >
        {debouncedSearchText !== searchText && searchText !== "" ? (
          <div className={styles.loadingState}>
            <LoadingSpinner colorValue={ColorValue.BrightPurple} />
          </div>
        ) : (
          <PopoverContentInner searchResults={searchResults} />
        )}
      </Suspense>
    </div>
  );
}

type Props = {
  debouncedSearchText: string;
  elementId: ElementId;
  popoverRef: RefObject<HTMLElement>;
  searchResults: Array<JSX.Element>;
  searchText: string;
  setSearchText: (searchText: string) => void;
  setVisible: (visible: boolean) => void;
  visible: boolean;
};

export default function GenericNftSearch({
  popoverRef,
  searchResults,
  elementId,
  searchText,
  debouncedSearchText,
  setSearchText,
  visible,
  setVisible,
}: Props): JSX.Element {
  usePreventModalScroll(visible, elementId);

  return (
    <Popover
      zIndex={HIGHER_THAN_MODAL_Z_INDEX}
      ref={popoverRef}
      overlayInnerStyle={{
        border: "1px solid",
        borderColor: ColorValue.Ghost,
        borderRadius: "16px",
        boxShadow: "none",
      }}
      placement="bottom"
      content={
        <PopoverContent
          debouncedSearchText={debouncedSearchText}
          elementId={elementId}
          searchResults={searchResults}
          searchText={searchText}
          visible={visible}
        />
      }
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
    >
      <div className={styles.container}>
        <SearchIcon colorValue={ColorValue.Secondary} size={24} />
        <input
          className={joinClasses(
            styles.input,
            FontClass.NavLink,
            ColorClass.Primary,
            styles.placeholder
          )}
          onChange={(e) => setSearchText(e.target.value)}
          onClick={() => setVisible(true)}
          placeholder="Add a piece"
          value={searchText}
        />
      </div>
    </Popover>
  );
}
