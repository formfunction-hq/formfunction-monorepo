import styles from "css/containers/AspectRatioContainer.module.css";
import joinClasses from "utils/joinClasses";

type Props = {
  children: any;
  className?: string;
  height: number;
  width: number;
};

export default function AspectRatioContainer({
  width,
  height,
  children,
  className,
}: Props): JSX.Element {
  const aspectRatio = height / width;
  return (
    <div className={styles.containerOuter}>
      <div
        style={{ paddingBottom: `calc(${aspectRatio} * 100%)` }}
        className={joinClasses(styles.container, className)}
      >
        <div className={styles.containerInner}>{children}</div>
      </div>
    </div>
  );
}
