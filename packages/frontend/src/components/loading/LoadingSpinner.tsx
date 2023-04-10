import { CSSProperties } from "react";
import ColorValue from "types/enums/ColorValue";
import joinClasses from "utils/joinClasses";
import styles from "css/loading/LoadingSpinner.module.css";
import FontClass from "types/enums/FontClass";

const COLOR_MAP = {
  [ColorValue.BrightPurple]: styles.brightPurple,
  [ColorValue.Ghost]: styles.ghost,
  [ColorValue.Navy]: styles.navy,
  [ColorValue.Primary]: styles.primary,
  [ColorValue.Secondary]: styles.secondary,
  [ColorValue.White]: styles.white,
};

const FONT_MAP = {
  [FontClass.Body1]: styles.body1,
  [FontClass.Body2]: styles.body2,
  [FontClass.NavLink]: styles.navLink,
};

type Props = {
  className?: string;
  colorValue: keyof typeof COLOR_MAP;
  fontClass?: keyof typeof FONT_MAP;
  size?: number;
  style?: CSSProperties;
};

export default function LoadingSpinner({
  className,
  colorValue,
  fontClass,
  size = 40,
  style = {},
}: Props): JSX.Element {
  const colorClassName = COLOR_MAP[colorValue];
  const fontClassName = fontClass == null ? null : FONT_MAP[fontClass];
  const styleInner = fontClass != null ? {} : { height: size, width: size };

  return (
    <div
      className={joinClasses(
        styles.ldsDualRing,
        colorClassName,
        className,
        fontClassName
      )}
      style={{ ...style, ...styleInner }}
    />
  );
}
