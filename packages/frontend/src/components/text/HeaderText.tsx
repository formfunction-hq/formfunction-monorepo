import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import joinClasses from "utils/joinClasses";
import styles from "css/text/HeaderText.module.css";
import { CSSProperties } from "react";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export type Props = {
  children: any;
  className?: string;
  colorClass: Maybe<ColorClass>;
  fontClass: FontClass;
  style?: CSSProperties;
  textAlign?: "center" | "left" | "right";
  textTransform?: "none" | "uppercase";
};

export default function HeaderText({
  children,
  className,
  colorClass,
  fontClass,
  textAlign,
  textTransform,
  style = {},
}: Props): JSX.Element {
  const classNameJoined = joinClasses(
    fontClass,
    styles.header,
    className,
    colorClass
  );

  const styleToUse = {
    ...(textAlign != null ? { textAlign } : {}),
    ...(textTransform != null ? { textTransform } : {}),
    ...style,
  };

  switch (fontClass) {
    case FontClass.Header1:
    case FontClass.FlashbackHeader0:
    case FontClass.FlashbackHeader1:
      return (
        <h1 className={classNameJoined} style={styleToUse}>
          {children}
        </h1>
      );
    case FontClass.Header2:
    case FontClass.FlashbackHeader2:
      return (
        <h2 className={classNameJoined} style={styleToUse}>
          {children}
        </h2>
      );
    case FontClass.Header3:
    case FontClass.FlashbackHeader3:
      return (
        <h3 className={classNameJoined} style={styleToUse}>
          {children}
        </h3>
      );
    default:
      throw new Error(`Unexpected fontClass of ${fontClass}`);
  }
}
