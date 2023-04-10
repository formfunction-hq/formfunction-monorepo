import styles from "css/pages/activity/ActivityOffersList.module.css";

type Props = {
  children: any;
};

export default function ActivityOffersList({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}
