import { CSSProperties } from "react";
import styles from "css/assets/YouTubeVideoGeneric.module.css";
import joinClasses from "utils/joinClasses";
import YouTube, { YouTubeProps } from "react-youtube";
import getYouTubeVideoIdFromUrl from "utils/you-tube/getYouTubeVideoIdFromUrl";

const YOUTUBE_VIDEO_PARAMS = {
  autohide: 1,
  autoplay: 0,
  controls: 1,
  enablejsapi: 1,
  loop: 1,
  modestbranding: 1,
  showinfo: 0,
};

export type Props = {
  borderRadius?: CSSProperties["borderRadius"];
  height: number | string;
  objectFit: CSSProperties["objectFit"];
  showDropShadow?: boolean;
  width: number | string;
  youTubeUrl: string;
};

export default function YouTubeVideo({
  borderRadius = 0,
  height,
  objectFit,
  showDropShadow = false,
  width,
  youTubeUrl,
}: Props) {
  const style = {
    borderRadius,
    height,
    objectFit,
    // Needed so border-radius cuts off extra content
    overflow: "hidden",
    width,
  };
  const videoId = getYouTubeVideoIdFromUrl(youTubeUrl);

  const youTubeOptions: YouTubeProps["opts"] = {
    height,
    playerVars: YOUTUBE_VIDEO_PARAMS,
    width,
  };
  if (videoId == null) {
    // Should never reach here
    return null;
  }
  return (
    <div
      className={joinClasses(
        styles.container,
        showDropShadow === true ? styles.dropShadow : undefined
      )}
      style={style}
    >
      <YouTube
        className={styles.fullHeightAndWidthContainer}
        videoId={videoId}
        opts={youTubeOptions}
      />
    </div>
  );
}
