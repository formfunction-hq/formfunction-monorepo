import styles from "css/pages/common/nft/editions-table/NftEditionsTableStructure.module.css";
import joinClasses from "utils/joinClasses";

type Props = {
  children: any;
  className?: string;
};

export default function NftEditionsTableStructure({
  children,
  className,
}: Props): JSX.Element {
  return <div className={joinClasses(styles.table, className)}>{children}</div>;
}
