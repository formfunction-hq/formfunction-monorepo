import Body1 from "components/text/Body1";
import Body1Medium from "components/text/Body1Medium";
import styles from "css/pages/stats/stats-row/StatsRowUserInfo.module.css";
import isEmptyString from "formfn-shared/dist/utils/string/isEmptyString";
import Skeleton from "react-loading-skeleton";
import ColorClass from "types/enums/ColorClass";
import ColorValue from "types/enums/ColorValue";

type Props = {
  displayName: string;
  isLoadingSkeleton?: boolean;
  photoUrl: string;
  username: string;
};

export default function StatsRowUserInfo({
  displayName,
  isLoadingSkeleton,
  photoUrl,
  username,
}: Props): JSX.Element {
  const imageElem = !isEmptyString(photoUrl) ? (
    <img className={styles.image} src={photoUrl} />
  ) : (
    <div className={styles.image} />
  );

  const displayNameStr = !isEmptyString(displayName) ? displayName : username;

  return (
    <div className={styles.userInfo}>
      {isLoadingSkeleton ? (
        <Skeleton
          className={styles.image}
          containerClassName={styles.imageSkeletonContainer}
          style={{ backgroundColor: ColorValue.SkeletonBase }}
        />
      ) : (
        imageElem
      )}
      <div className={styles.userNames}>
        <Body1Medium
          className={styles.username}
          colorClass={ColorClass.Primary}
        >
          {isLoadingSkeleton ? <Skeleton width={100} /> : displayNameStr}
        </Body1Medium>
        <Body1 className={styles.username} colorClass={ColorClass.Secondary}>
          {isLoadingSkeleton ? <Skeleton width={100} /> : `@${username}`}
        </Body1>
      </div>
    </div>
  );
}
