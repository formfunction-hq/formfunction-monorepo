import Skeleton from "react-loading-skeleton";
import styles from "css/series/SeriesCardLoadingSkeleton.module.css";
import seriesCardStyles from "css/series/SeriesCard.module.css";
import joinClasses from "utils/joinClasses";
import TinyLabel from "components/text/TinyLabel";
import ArtName from "components/text/ArtName";
import SeriesCardImage from "components/series/SeriesCardImage";
import ArtistPillLoadingSkeleton from "components/auction/ArtistPillLoadingSkeleton";

export default function SeriesCardLoadingSkeleton(): JSX.Element {
  return (
    <div className={seriesCardStyles.container}>
      <SeriesCardImage
        artistPillButton={<ArtistPillLoadingSkeleton />}
        isSkeleton
        src={null}
      />
      {/* TODO: consolidate with code in SeriesCard */}
      <div className={seriesCardStyles.info}>
        <div
          className={joinClasses(styles.infoLeft, seriesCardStyles.infoLeft)}
        >
          <TinyLabel className={styles.numPieces} colorClass={null}>
            <Skeleton />
          </TinyLabel>
          <ArtName className={styles.seriesName} colorClass={null}>
            <Skeleton />
          </ArtName>
        </div>
      </div>
    </div>
  );
}
