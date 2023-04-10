import styles from "css/misc/Inline.module.css";

export default function Inline({
  children,
  columnGap,
}: {
  children: any;
  columnGap: number;
}) {
  return (
    <div className={styles.inline} style={{ columnGap }}>
      {children}
    </div>
  );
}
