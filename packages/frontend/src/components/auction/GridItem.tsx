import styles from "css/auction/GridItem.module.css";

type Props = {
  children: any;
};

export default function GridItem({ children }: Props) {
  return <div className={styles.item}>{children}</div>;
}
