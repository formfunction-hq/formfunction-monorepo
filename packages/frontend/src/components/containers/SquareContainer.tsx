import styles from "css/containers/SquareContainer.module.css";
import joinClasses from "utils/joinClasses";

type Props = {
  children: any;
  className?: string;
  containerInnerClassName?: string;
};

export default function SquareContainer({
  children,
  className,
  containerInnerClassName,
}: Props): JSX.Element {
  return (
    <div className={styles.containerOuter}>
      <div className={joinClasses(styles.containerSquare, className)}>
        <div
          className={joinClasses(
            styles.containerInner,
            containerInnerClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
