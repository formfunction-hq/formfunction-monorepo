import styles from "css/pages/profile/ProfileCard.module.css";

type Props = {
  children: any;
};

export default function ProfileCard({ children }: Props): JSX.Element {
  return <div className={styles.card}>{children}</div>;
}
