import Header3 from "components/text/Header3";
import styles from "css/pages/activity/ActivitySection.module.css";
import ColorClass from "types/enums/ColorClass";

type Props = {
  children: any;
  showBottomDivider?: boolean;
  title: string;
};

export default function ActivitySection({
  children,
  showBottomDivider = false,
  title,
}: Props) {
  return (
    <div>
      <Header3 colorClass={ColorClass.Primary}>{title}</Header3>
      <div className={styles.children}>{children}</div>
      {showBottomDivider && <div className={styles.bottomDivider} />}
    </div>
  );
}
