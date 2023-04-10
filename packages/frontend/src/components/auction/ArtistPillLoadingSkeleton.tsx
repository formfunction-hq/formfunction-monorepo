import Skeleton from "react-loading-skeleton";
import styles from "css/auction/ArtistPillLoadingSkeleton.module.css";

export default function ArtistPillLoadingSkeleton() {
  return (
    <div className={styles.buttonSkeleton}>
      <div className={styles.imageSkeleton}>
        <Skeleton />
      </div>
    </div>
  );
}
