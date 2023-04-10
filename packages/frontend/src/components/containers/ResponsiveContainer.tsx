import ElementId from "types/enums/ElementId";
import containerStyles from "css/containers/ResponsiveContainer.module.css";
import joinClasses from "utils/joinClasses";
import { CSSProperties } from "react";

type Props = {
  children: any;
  className?: string;
  height?: string;
  id?: ElementId;
  maxWidthDisabled?: boolean;
  style?: CSSProperties;
};

export default function ResponsiveContainer({
  children,
  className,
  height,
  id,
  maxWidthDisabled = false,
  style,
}: Props): JSX.Element {
  const styleToUse = {
    ...style,
    height,
    maxWidth: maxWidthDisabled ? "none" : undefined,
  };

  return (
    <div
      className={joinClasses(containerStyles.container, className)}
      id={id}
      style={styleToUse}
    >
      {children}
    </div>
  );
}
