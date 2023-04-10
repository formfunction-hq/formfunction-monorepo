import SquareContainer from "components/containers/SquareContainer";
import styles from "css/pages/explore/ExploreCreatorCard.module.css";
import loadingStyles from "css/pages/explore/ExploreCreatorCardLoadingSkeleton.module.css";
import Skeleton from "react-loading-skeleton";
import joinClasses from "utils/joinClasses";
import { range } from "formfn-shared/dist/utils/range";

export default function ExploreCreatorCardLoadingSkeleton(): JSX.Element {
  const profilePhoto = (
    <Skeleton
      className={joinClasses(styles.profilePhoto, loadingStyles.profilePhoto)}
    />
  );

  return (
    <div className={styles.container}>
      <div className={styles.userSection}>
        {profilePhoto}
        <div
          className={joinClasses(
            styles.usernameAndBio,
            loadingStyles.usernameAndBio
          )}
        >
          <Skeleton className={loadingStyles.title} />
        </div>
      </div>
      <div className={styles.nftsSection}>
        {range(3).map((val) => (
          <SquareContainer key={val}>
            <Skeleton className={styles.nftImage} />
          </SquareContainer>
        ))}
      </div>
    </div>
  );
}
