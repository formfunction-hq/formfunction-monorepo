import { useCallback, useEffect, useRef } from "react";
import type HlsType from "hls.js";
// @ts-ignore
import Hls from "hls.js/dist/hls.light.min.js";
import emptyFunction from "formfn-shared/dist/utils/emptyFunction";
import { MaybeUndef, Undef } from "formfn-shared/dist/types/UtilityTypes";
import isMobile from "utils/isMobile";
import AssetWithShimmer from "components/images/AssetWithShimmer";
import VideoQuality from "types/enums/VideoQuality";
import UrlParam from "types/enums/UrlParam";
import getUrlParam from "utils/getUrlParam";
import invariant from "tiny-invariant";

type Props = {
  [key: string]: any;
  className?: string;
  controls?: boolean;
  isMuted?: boolean;
  playbackId?: MaybeUndef<string>;
  poster?: string;
  quality?: VideoQuality;
  shimmerClassName?: string;
  showShimmer?: boolean;
  src: string;
};

function findQualityLevel(
  width: number,
  desiredQuality: VideoQuality,
  qualityLevels?: Array<{
    [key: string]: any;
    width?: number;
  }>
) {
  if (!qualityLevels || desiredQuality === VideoQuality.Best) {
    return -1;
  }

  const targetWidth = desiredQuality === VideoQuality.X2 ? width * 2 : width;
  // NOTE: 800 is arbitary
  if (targetWidth <= 800) {
    // For smaller videos, just render best quality
    return -1;
  }

  const index = qualityLevels.findIndex(
    (qualityLevel) => targetWidth > (qualityLevel.width ?? 0)
  );
  // Use the smallest video with width > element width
  const indexToUse = (index === -1 ? qualityLevels.length : index) - 1;

  // For HLS, lower numbers indicate lower quality but
  // qualityLevels is sorted from highest to lowest quality
  // in the manifest
  return qualityLevels.length - indexToUse;
}

export default function Video({
  className,
  controls = false,
  isMuted = true,
  playbackId,
  poster,
  showShimmer = false,
  shimmerClassName,
  src,
  quality = VideoQuality.X1,
  ...rest
}: Props) {
  const hlsRef = useRef<MaybeUndef<HlsType>>(null);
  const videoRef = useCallback(
    (node) => {
      if (node == null || playbackId == null) {
        return;
      }

      if (getUrlParam(UrlParam.DisableHls) === "1") {
        // eslint-disable-next-line no-param-reassign
        node.src = src;
        return;
      }

      let hls: Undef<HlsType>;

      const muxSrc = `https://stream.mux.com/${playbackId}.m3u8`;
      if (node != null) {
        if (node.canPlayType("application/vnd.apple.mpegurl")) {
          // Some browers (safari and ie edge) support HLS natively
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          node.src = muxSrc;
        } else if (Hls.isSupported()) {
          // This will run in all other modern browsers
          hls = new Hls();
          invariant(hls != null);
          hls.loadSource(muxSrc);
          hls.attachMedia(node);
          hls.on(Hls.Events.MEDIA_ATTACHED, rest.onLoad ?? emptyFunction);
          const width = node.offsetWidth;
          // @ts-ignore
          hls.on(Hls.Events.MANIFEST_LOADED, (_, data) => {
            const level = findQualityLevel(width, quality, data.levels);
            hls!.currentLevel = level;
            hls!.nextLevel = level;
          });
          hls.startLoad();
        } else {
          // eslint-disable-next-line no-console
          console.error("This is a legacy browser that doesn't support MSE");
        }
      }

      hlsRef.current = hls;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [playbackId]
  );

  useEffect(
    // Cleanup on unmount
    () => () => {
      if (hlsRef.current != null) {
        hlsRef.current.destroy();
      }
    },
    []
  );

  let body;
  if (playbackId != null) {
    const preview = `https://image.mux.com/${playbackId}/thumbnail.jpg`;
    body = (
      <video
        {...rest}
        autoPlay
        className={className}
        controls={controls}
        loop
        muted={isMuted}
        playsInline
        // On mobile iOS, poster shows, then there's a flash of white, then video plays.
        // This is bad loading UX.
        // See https://app.asana.com/0/1201632739634044/1201765487294073/f for more details
        poster={poster ?? isMobile() ? undefined : preview}
        preload="auto"
        ref={videoRef}
      />
    );
  } else {
    body = (
      <video
        autoPlay
        controls={controls}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        className={className}
        src={src}
        {...rest}
      />
    );
  }

  return showShimmer ? (
    <AssetWithShimmer className={shimmerClassName}>{body}</AssetWithShimmer>
  ) : (
    body
  );
}
