import styles from "css/auction/NftOtherInfoWithSeparator.module.css";

export default function NftOtherInfoWithSeparator({
  children,
}: {
  children: any;
}): JSX.Element {
  return <div className={styles.withSeparator}>{children}</div>;
}
