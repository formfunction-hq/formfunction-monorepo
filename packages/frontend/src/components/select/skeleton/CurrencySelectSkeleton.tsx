import Skeleton from "react-loading-skeleton";
import styles from "css/select/skeleton/CurrencySelectSkeleton.module.css";
import ColorValue from "types/enums/ColorValue";
import ChevronDownIcon from "components/icons/ChevronDownIcon";

export default function CurrencySelectSkeleton() {
  return (
    <div className={styles.container}>
      <Skeleton className={styles.skeleton} />
      <ChevronDownIcon colorValue={ColorValue.Primary} size={24} />
    </div>
  );
}
