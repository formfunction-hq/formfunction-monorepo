import Skeleton from "react-loading-skeleton";
import styles from "css/spotlights/SpotlightCard.module.css";
import skeletonStyles from "css/spotlights/skeletons/SpotlightCardLoadingSkeleton.module.css";
import TinyLabel from "components/text/TinyLabel";
import ArtName from "components/text/ArtName";
import ColorClass from "types/enums/ColorClass";
import ArtistPillLoadingSkeleton from "components/auction/ArtistPillLoadingSkeleton";

export default function ListingCardLoadingSkeleton(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.asset}>
          <Skeleton className={skeletonStyles.image} />
        </div>
        <div className={styles.spotlightInfo}>
          <TinyLabel
            textTransform="uppercase"
            colorClass={ColorClass.Secondary}
          >
            <Skeleton className={skeletonStyles.label} />
          </TinyLabel>
          <ArtName colorClass={ColorClass.Primary}>
            <Skeleton className={skeletonStyles.title} />
          </ArtName>
        </div>
      </div>
      <div className={styles.artistPills}>
        <ArtistPillLoadingSkeleton />
      </div>
    </div>
  );
}
