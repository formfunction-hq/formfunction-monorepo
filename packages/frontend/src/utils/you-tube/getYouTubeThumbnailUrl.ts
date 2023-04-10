import { Maybe } from "graphql/jsutils/Maybe";
import getYouTubeVideoIdFromUrl from "utils/you-tube/getYouTubeVideoIdFromUrl";

export default function getYouTubeThumbnailUrl(url: string): Maybe<string> {
  const videoId = getYouTubeVideoIdFromUrl(url);
  return videoId == null ? null : `http://img.youtube.com/vi/${videoId}/0.jpg`;
}
