import styles from "css/series/SeriesGridFullWidth.module.css";
import joinClasses from "utils/joinClasses";

type Props = {
  children: any;
  className?: string;
};

export default function SeriesGridFullWidth({
  children,
  className,
}: Props): JSX.Element {
  return <div className={joinClasses(styles.grid, className)}>{children}</div>;
}
