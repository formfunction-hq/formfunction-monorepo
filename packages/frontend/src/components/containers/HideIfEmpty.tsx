import styles from "css/containers/HideIfEmpty.module.css";
import joinClasses from "utils/joinClasses";

type Props = {
  children: any;
  className?: string;
};

/**
 * See https://stackoverflow.com/a/70806881 for an in-depth explanation of when this component comes in handy.
 */
export default function HideIfEmpty({ children, className }: Props) {
  return (
    <div className={joinClasses(styles.container, className)}>{children}</div>
  );
}
