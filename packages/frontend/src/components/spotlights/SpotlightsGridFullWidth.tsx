import styles from "css/spotlights/SpotlightsGridFullWidth.module.css";
import joinClasses from "utils/joinClasses";

type Props = {
  children: any;
  className?: string;
};

export default function SpotlightsGridFullWidth({
  children,
  className,
}: Props): JSX.Element {
  return <div className={joinClasses(styles.grid, className)}>{children}</div>;
}
