import styles from "css/pages/common/nft-filters/FilterItems.module.css";

type Props = { children: any };

export default function FilterItems({ children }: Props) {
  return <div className={styles.items}>{children}</div>;
}
