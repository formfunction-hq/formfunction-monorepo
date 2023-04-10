import styles from "css/pages/activity/ActivitySections.module.css";

type Props = {
  children: any;
};

export default function ActivitySections({ children }: Props) {
  return <div className={styles.sections}>{children}</div>;
}
