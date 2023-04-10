import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";

import BackgroundOverlay from "components/loading/BackgroundOverlay";
import CloseButton from "components/buttons/CloseButton";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import OutsideClickHideModal from "components/modal/OutsideClickHideModal";
import ReactDOM from "react-dom";
import joinClasses from "utils/joinClasses";
import styles from "css/modal/GenericModal.module.css";
import { RefObject, useEffect } from "react";
import FontClass from "types/enums/FontClass";
import useIsBottomTabsWidth from "hooks/useIsBottomTabsWidth";
import BottomDrawer from "components/drawers/BottomDrawer";
import BackgroundOverlayTheme from "types/enums/BackgroundOverlayTheme";
import ElementId from "types/enums/ElementId";
import Body1 from "components/text/Body1";

type Props = {
  backgroundOverlayTheme?: BackgroundOverlayTheme;
  bottomDrawerHeight?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  className?: string;
  description?: string | JSX.Element;
  disableResponsiveContainerBottomDrawer?: boolean;
  excludeRefs?: Array<RefObject<HTMLElement>>;
  footer?: MaybeUndef<JSX.Element>;
  hideCloseButton?: boolean;
  isShown: boolean;
  maxWidth?: number;
  modalId?: ElementId;
  onHide: () => void;
  title?: string | JSX.Element;
  titleFontClass?: FontClass;
};

export default function GenericModal({
  backgroundOverlayTheme,
  bottomDrawerHeight,
  children,
  className,
  description,
  disableResponsiveContainerBottomDrawer = false,
  hideCloseButton = false,
  footer,
  maxWidth,
  modalId,
  isShown,
  onHide,
  title,
  titleFontClass = FontClass.Header2,
  excludeRefs,
}: Props): Maybe<JSX.Element> {
  const isBottomTabsWidth = useIsBottomTabsWidth();
  // Disable outer scroll when modal is visible.
  // See https://stackoverflow.com/questions/9538868/prevent-body-from-scrolling-when-a-modal-is-opened/69005672#69005672.
  useEffect(() => {
    if (isShown) {
      const width = document.body.clientWidth;
      document.body.style.overflowY = "hidden";
      document.body.style.width = `${width}px`;
    }

    return () => {
      document.body.style.overflowY = "scroll";
      document.body.style.width = `100%`;
    };
  }, [isShown]);

  if (!isShown && !isBottomTabsWidth) {
    // Don't render null when rendering bottom drawer, otherwise it will mess up transitions
    // when you open one drawer from another.
    return null;
  }

  const closeRow = !hideCloseButton && (
    <div className={styles.closeRow}>
      <CloseButton colorValue={ColorValue.White} onClick={onHide} />
    </div>
  );

  if (isBottomTabsWidth) {
    return (
      <BottomDrawer
        overlayColor={
          backgroundOverlayTheme === BackgroundOverlayTheme.SensitiveContent
            ? ColorValue.BackgroundOverlayDark
            : undefined
        }
        bottomDrawerHeight={bottomDrawerHeight}
        description={description}
        disableResponsiveContainer={disableResponsiveContainerBottomDrawer}
        isShown={isShown}
        onHide={onHide}
        title={title}
      >
        {children}
      </BottomDrawer>
    );
  }

  return ReactDOM.createPortal(
    <div
      className={styles.container}
      style={{
        top: window.scrollY,
      }}
    >
      {isShown && <BackgroundOverlay theme={backgroundOverlayTheme} />}
      {/* Need this extra container to make it so closeRow still shows up, but when modal is scrollable the border radius applies */}
      <div className={styles.containerInner} style={{ maxWidth }}>
        {closeRow}
        <OutsideClickHideModal
          className={styles.outsideClick}
          hideModal={onHide}
          excludeRefs={excludeRefs}
          onBackgroundOverlayOnly
        >
          <div
            id={modalId}
            className={joinClasses(styles.modal, className)}
            style={{ maxHeight: hideCloseButton ? "95vh" : "85vh" }}
          >
            {title != null && (
              <div className={styles.title}>
                {typeof title === "string" ? (
                  <div
                    className={joinClasses(ColorClass.Primary, titleFontClass)}
                    style={{ textAlign: "center" }}
                  >
                    {title}
                  </div>
                ) : (
                  title
                )}
                {description != null &&
                  (typeof description === "string" ? (
                    <Body1 colorClass={ColorClass.Secondary} textAlign="center">
                      {description}
                    </Body1>
                  ) : (
                    description
                  ))}
              </div>
            )}
            {children}
            {footer != null && <div className={styles.footer}>{footer}</div>}
          </div>
        </OutsideClickHideModal>
      </div>
    </div>,
    document.body
  );
}
