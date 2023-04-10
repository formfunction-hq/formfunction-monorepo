import styles from "css/series/SeriesCardImage.module.css";
import { useState } from "react";
import SquareContainer from "components/containers/SquareContainer";
import Imgix from "react-imgix";
import MaybeImgix from "components/images/MaybeImgix";
import LoadingShimmer from "components/loading/LoadingShimmer";
import Skeleton from "react-loading-skeleton";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import useLazyLoadConfig from "hooks/useLazyLoadConfig";
import MaybeWrapWithLazyLoad from "components/containers/MaybeWrapWithLazyLoad";

type Props = {
  artistPillButton: JSX.Element;
  isSkeleton?: boolean;
  src: MaybeUndef<string>;
};

export default function SeriesCardImage({
  artistPillButton,
  isSkeleton,
  src,
}: Props): JSX.Element {
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const lazyLoadConfig = useLazyLoadConfig(null);

  const image =
    src == null || isError ? (
      <SquareContainer className={styles.container}>
        {isSkeleton ? (
          <Skeleton className={styles.image} />
        ) : (
          <div className={styles.image} />
        )}
      </SquareContainer>
    ) : (
      <SquareContainer className={styles.container}>
        {!isLoaded && (
          <div className={styles.image}>
            <LoadingShimmer borderRadius={16} />
          </div>
        )}
        <div className={styles.artistPill}>{artistPillButton}</div>
        <MaybeWrapWithLazyLoad lazyLoadConfig={lazyLoadConfig}>
          <MaybeImgix src={src}>
            <Imgix
              className={styles.image}
              disableSrcSet
              htmlAttributes={{
                onError: () => setIsError(true),
                onLoad: () => setIsLoaded(true),
              }}
              src={src}
              width={1000}
            />
            <img
              className={styles.image}
              onLoad={() => setIsLoaded(true)}
              onError={() => setIsError(true)}
              src={src}
            />
          </MaybeImgix>
        </MaybeWrapWithLazyLoad>
      </SquareContainer>
    );

  return <div className={styles.imageContainer}>{image}</div>;
}
