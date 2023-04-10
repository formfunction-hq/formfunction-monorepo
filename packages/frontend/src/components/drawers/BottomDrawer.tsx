import CloseButton from "components/buttons/CloseButton";
import ResponsiveContainer from "components/containers/ResponsiveContainer";
import Body1 from "components/text/Body1";
import Price from "components/text/Price";
import styles from "css/drawers/BottomDrawer.module.css";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useEffect, useState } from "react";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";
import ElementId from "types/enums/ElementId";
import { Drawer as MantineDrawer } from "@mantine/core";

// NOTE: Determined experimentally. May change if the title row uses a different font or padding.
const DEFAULT_TITLE_ROW_HEIGHT = 64;
// The height of the bottom drawer will never exceed the window height - HEIGHT_BUFFER.
// Without this, the bottom drawer could take up the entire screen, which looks weird.
const HEIGHT_BUFFER = 40;
// Height of the line that separates the title row from the drawer body.
const SEPARATOR_HEIGHT = 1;

type Props = {
  bottomDrawerHeight?: number;
  children: any;
  description?: string | JSX.Element;
  disableResponsiveContainer?: boolean;
  isShown: boolean;
  onHide: () => void;
  overlayColor?:
    | ColorValue.BackgroundOverlay
    | ColorValue.BackgroundOverlayDark;
  title?: string | JSX.Element;
};

export default function BottomDrawer({
  bottomDrawerHeight,
  children,
  description: descriptionOriginal,
  disableResponsiveContainer = false,
  isShown,
  onHide,
  overlayColor = ColorValue.BackgroundOverlay,
  title = "",
}: Props): JSX.Element {
  const [bodyScrollHeight, setBodyScrollHeight] = useState(0);
  const { width, height: windowHeight } = useWindowDimensions();
  const [titleRowHeight, setTitleRowHeight] = useState(0);
  useEffect(() => {
    if (isShown) {
      // Use setTimeout so the element is guaranteed to be found (but also have a default value
      // just in case)
      setTimeout(() => {
        setTitleRowHeight(
          document.getElementById(ElementId.BottomDrawerTitleRow)
            ?.offsetHeight ?? DEFAULT_TITLE_ROW_HEIGHT
        );
      }, 0);
    }
  }, [isShown, width]);

  const titleAreaHeight = titleRowHeight + SEPARATOR_HEIGHT;

  const drawerHeight =
    bottomDrawerHeight ??
    // By default, the height is dynamic. If possible, the entire body is shown. Otherwise,
    // the drawer extends up to some max height, and then the body becomes scrollable.
    Math.min(windowHeight - HEIGHT_BUFFER, bodyScrollHeight + titleAreaHeight);

  const description =
    descriptionOriginal != null &&
    (typeof descriptionOriginal === "string" ? (
      <Body1
        className={styles.description}
        colorClass={ColorClass.Secondary}
        textAlign="center"
      >
        {descriptionOriginal}
      </Body1>
    ) : (
      <div className={styles.description}>{descriptionOriginal}</div>
    ));

  return (
    <MantineDrawer
      size={drawerHeight}
      position="bottom"
      opened={isShown}
      onClose={onHide}
      transitionDuration={0}
      overlayColor={overlayColor}
      overlayOpacity={1}
      withCloseButton={false}
      // Make it appear over bottom tabs
      zIndex={10000}
    >
      <ResponsiveContainer className={styles.header}>
        <div className={styles.titleRow} id={ElementId.BottomDrawerTitleRow}>
          <CloseButton colorValue={ColorValue.Secondary} onClick={onHide} />
          <Price colorClass={ColorClass.Primary}>{title}</Price>
          <CloseButton colorValue={ColorValue.Secondary} isShown={false} />
        </div>
      </ResponsiveContainer>
      <div className={styles.separator} />
      {/* Restrict height so body is scrollable, and not the entire drawer. */}
      <div
        className={styles.body}
        ref={(elem) => {
          if (elem != null) {
            setBodyScrollHeight(elem.scrollHeight);

            // In case children contains some images which take a bit to load
            setTimeout(() => setBodyScrollHeight(elem.scrollHeight), 0);
            setTimeout(() => setBodyScrollHeight(elem.scrollHeight), 100);
            setTimeout(() => setBodyScrollHeight(elem.scrollHeight), 1000);
          }
        }}
        // Set height so body overflows, and not entire drawer
        style={{
          maxHeight: drawerHeight - titleAreaHeight,
        }}
      >
        {disableResponsiveContainer ? (
          <>
            {description}
            {children}
          </>
        ) : (
          <ResponsiveContainer>
            {description}
            {children}
          </ResponsiveContainer>
        )}
      </div>
    </MantineDrawer>
  );
}
