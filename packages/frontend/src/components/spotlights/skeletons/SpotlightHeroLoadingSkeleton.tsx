import styles from "css/spotlights/SpotlightHeroBasic.module.css";
import Skeleton from "react-loading-skeleton";

export default function SpotlightHeroLoadingSkeleton(): JSX.Element {
  return <Skeleton className={styles.container} />;
}
