import styles from "css/containers/OverlayContainer.module.css";
import { CSSProperties } from "react";
import joinClasses from "utils/joinClasses";

type Props = {
  alignItems?: CSSProperties["alignItems"];
  children: any;
  className?: string;
  justifyContent?: CSSProperties["justifyContent"];
};

export default function OverlayContainer({
  alignItems = "flex-end",
  children,
  className,
  justifyContent = "flex-end",
}: Props) {
  return (
    <div
      className={joinClasses(styles.overlay, className)}
      style={{ alignItems, justifyContent }}
    >
      {children}
    </div>
  );
}
