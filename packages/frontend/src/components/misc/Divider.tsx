import ColorClass from "types/enums/ColorClass";
import joinClasses from "utils/joinClasses";
import styles from "css/misc/Divider.module.css";

type Props = {
  className?: string;
  colorClass: ColorClass.Secondary | ColorClass.Tertiary;
  direction?: "horizontal" | "vertical" | undefined;
  width?: number;
};

const DIRECTION_TO_DIRECTION_CLASS = {
  horizontal: styles.divider,
  vertical: styles.dividerVertical,
};

const COLOR_CLASS_TO_BORDER_COLOR_CLASS = {
  [ColorClass.Secondary]: styles.colorSecondary,
  [ColorClass.Tertiary]: styles.colorTertiary,
};

export default function Divider({
  className,
  colorClass,
  direction = "horizontal",
  width,
}: Props) {
  return (
    <div
      style={{ width }}
      className={joinClasses(
        DIRECTION_TO_DIRECTION_CLASS[direction],
        COLOR_CLASS_TO_BORDER_COLOR_CLASS[colorClass],
        className
      )}
    />
  );
}
