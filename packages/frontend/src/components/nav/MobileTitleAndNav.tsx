import Price from "components/text/Price";
import styles from "css/nav/MobileTitleAndNav.module.css";
import ColorClass from "types/enums/ColorClass";
import joinClasses from "utils/joinClasses";

type Props = {
  className?: string;
  left?: any;
  right?: any;
  title: string;
};

export default function MobileTitleAndNav({
  className,
  left,
  right,
  title,
}: Props): JSX.Element {
  return (
    <div className={joinClasses(styles.container, className)}>
      <div className={styles.left}>{left ?? <div />}</div>
      <Price colorClass={ColorClass.Primary} textAlign="center">
        {title}
      </Price>
      <div className={styles.right}>{right ?? <div />}</div>
    </div>
  );
}
