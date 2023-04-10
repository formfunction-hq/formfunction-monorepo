import { CSSProperties } from "react";
import ColorClass from "types/enums/ColorClass";
import FontClass from "types/enums/FontClass";
import joinClasses from "utils/joinClasses";
import styles from "css/text/BodyText.module.css";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export type Props = {
  children:
    | number
    | string
    | JSX.Element
    | Array<JSX.Element | string | number | boolean | null>
    | null;
  className?: string;
  colorClass: Maybe<ColorClass>;
  display?: CSSProperties["display"];
  fontClass: FontClass | "inherit";
  style?: CSSProperties;
  textAlign?: "center" | "left" | "right";
  textTransform?: "none" | "uppercase";
  truncateLines?: number;
  whiteSpace?: CSSProperties["whiteSpace"];
};

export default function BodyText({
  children,
  className,
  colorClass,
  display,
  fontClass,
  style,
  textAlign,
  textTransform,
  truncateLines,
  whiteSpace,
}: Props): JSX.Element {
  const classNameJoined = joinClasses(
    fontClass,
    className,
    colorClass,
    styles.bodyText,
    truncateLines != null ? styles.truncate : undefined
  );

  const styleToUse = {
    ...(style ?? {}),
    ...(textAlign != null ? { textAlign } : {}),
    ...(textTransform != null ? { textTransform } : {}),
    ...(whiteSpace != null ? { whiteSpace } : {}),
    ...(display != null ? { display } : {}),
    ...(truncateLines != null
      ? { WebkitLineClamp: truncateLines, lineClamp: truncateLines }
      : {}),
  };

  return (
    <div className={classNameJoined} style={styleToUse}>
      {children}
    </div>
  );
}
