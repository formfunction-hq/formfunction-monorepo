import styles from "css/pages/common/nft/NftTransactions.module.css";
import intersperseFn from "utils/intersperseFn";

type Props = {
  children: Array<JSX.Element>;
  className?: string;
  separatorMargin?: number;
};

export default function NftTransactions({
  children,
  className,
  separatorMargin = 8,
}: Props): JSX.Element {
  return (
    <div className={className}>
      {intersperseFn(children, (index) => (
        <div
          key={`separator${index}`}
          className={styles.separator}
          style={{ marginBottom: separatorMargin, marginTop: separatorMargin }}
        />
      ))}
    </div>
  );
}
