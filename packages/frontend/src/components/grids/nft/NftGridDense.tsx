import styles from "css/grids/nft/NftGridDense.module.css";
import joinClasses from "utils/joinClasses";

type Props = {
  children: any;
  className?: string;
};

export default function NftGridDense({
  children,
  className,
}: Props): JSX.Element {
  return <div className={joinClasses(styles.grid, className)}>{children}</div>;
}
