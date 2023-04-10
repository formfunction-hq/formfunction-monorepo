import { MaybeUndef, Undef } from "formfn-shared/dist/types/UtilityTypes";
import styles from "css/auction/ListingCardImage.module.css";
import { useState } from "react";
import SquareContainer from "components/containers/SquareContainer";
import Video from "components/videos/Video";
import Imgix from "react-imgix";
import MaybeImgix from "components/images/MaybeImgix";
import LoadingShimmer from "components/loading/LoadingShimmer";
import isMobile from "utils/isMobile";
import VideoQuality from "types/enums/VideoQuality";
import useFlagsTyped from "hooks/useFlagsTyped";
import Skeleton from "react-loading-skeleton";
import MediaTypeOrUnknown from "types/MediaTypeOrUnknown";
import MediaType from "types/enums/MediaType";
import ModelViewerLazy from "components/model-viewer/ModelViewerLazy";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import useLazyLoadConfig from "hooks/useLazyLoadConfig";
import MaybeWrapWithLazyLoad from "components/containers/MaybeWrapWithLazyLoad";
import joinClasses from "utils/joinClasses";

function Asset({
  desiredVideoQuality,
  isBlurred,
  isMuted,
  isWideAsset,
  mediaType,
  setIsError,
  setIsLoaded,
  src,
  videoPlaybackId,
}: {
  desiredVideoQuality: VideoQuality;
  isBlurred: boolean;
  isMuted: Undef<boolean>;
  isWideAsset: boolean;
  mediaType: MediaTypeOrUnknown;
  setIsError: (val: boolean) => void;
  setIsLoaded: (val: boolean) => void;
  src: string;
  videoPlaybackId: MaybeUndef<string>;
}) {
  const { disableHlsForListingCard, listingCardImageDimensions } =
    useFlagsTyped();
  const imageClassToUse = joinClasses(
    styles.image,
    isBlurred ? styles.imageBlurred : undefined
  );

  switch (mediaType) {
    case MediaType.ImageGif:
    case MediaType.ImageJpg:
    case MediaType.ImageJpeg:
    case MediaType.ImagePng:
      return (
        <MaybeImgix src={src}>
          <Imgix
            className={imageClassToUse}
            disableSrcSet
            height={
              // For wide assets, constrain the height.
              // ?. is only needed for localhost
              isWideAsset ? listingCardImageDimensions?.height : undefined
            }
            htmlAttributes={{
              onError: () => setIsError(true),
              onLoad: () => setIsLoaded(true),
            }}
            src={src}
            width={
              // For tall assets, constrain the width.
              // ?. is only needed for localhost
              !isWideAsset ? listingCardImageDimensions?.width : undefined
            }
          />
          <img
            className={imageClassToUse}
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsError(true)}
            src={src}
          />
        </MaybeImgix>
      );
    case MediaType.ModelGltfBinary:
      return (
        <div className={imageClassToUse}>
          <ModelViewerLazy src={src} />
        </div>
      );
    case MediaType.TextHtml:
      // TODO[@arcticmatt] haven't tested this yet
      return (
        <div className={imageClassToUse}>
          <iframe src={src} title="HTML file" />
        </div>
      );
    case MediaType.VideoMp4:
    case MediaType.VideoQuicktime:
      return (
        <Video
          className={imageClassToUse}
          isMuted={isMuted}
          onError={() => setIsError(true)}
          onLoad={() => setIsLoaded(true)}
          playbackId={disableHlsForListingCard ? null : videoPlaybackId}
          src={src}
          quality={desiredVideoQuality}
        />
      );
    case "unknown":
      return null;
    default:
      return assertUnreachable(mediaType);
  }
}

type Props = {
  desiredVideoQuality?: VideoQuality;
  isBlurred?: boolean;
  isMuted?: boolean;
  isSkeleton?: boolean;
  isWideAsset?: boolean;
  mediaType: MediaTypeOrUnknown;
  overlayContent?: JSX.Element;
  pills?: Array<JSX.Element>;
  src: MaybeUndef<string>;
  videoPlaybackId?: MaybeUndef<string>;
};

export default function ListingCardImage({
  desiredVideoQuality = VideoQuality.X1,
  isBlurred,
  isMuted,
  isSkeleton = false,
  isWideAsset = true,
  mediaType,
  overlayContent,
  pills,
  src,
  videoPlaybackId,
}: Props): JSX.Element {
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const lazyLoadConfig = useLazyLoadConfig(mediaType);
  const { listingCardConfig } = useFlagsTyped();

  const image =
    src == null || isError ? (
      <SquareContainer containerInnerClassName={styles.container}>
        {isSkeleton ? (
          <Skeleton className={styles.image} />
        ) : (
          <div className={styles.image} />
        )}
      </SquareContainer>
    ) : (
      <SquareContainer containerInnerClassName={styles.container}>
        {/* Don't show spinner when playing Mux video, b/c there's a poster */}
        {!isLoaded &&
          (videoPlaybackId == null || isMobile()) &&
          listingCardConfig?.hideShimmer !== true && (
            <LoadingShimmer borderRadius={16} />
          )}
        <MaybeWrapWithLazyLoad lazyLoadConfig={lazyLoadConfig}>
          {listingCardConfig?.hideAsset === true ? (
            <div />
          ) : (
            <Asset
              desiredVideoQuality={desiredVideoQuality}
              isBlurred={isBlurred ?? false}
              isMuted={isMuted}
              isWideAsset={isWideAsset}
              mediaType={mediaType}
              setIsError={setIsError}
              setIsLoaded={setIsLoaded}
              src={src}
              videoPlaybackId={videoPlaybackId}
            />
          )}
        </MaybeWrapWithLazyLoad>
        {overlayContent != null && (
          <div className={styles.overlayContent}>{overlayContent}</div>
        )}
      </SquareContainer>
    );

  if (pills == null || pills.length === 0) {
    return image;
  }

  return (
    <div className={styles.imageContainer}>
      <div className={styles.pills}>
        {pills.map((pill, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>{pill}</div>
        ))}
      </div>
      {image}
    </div>
  );
}
