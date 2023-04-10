import getYouTubeVideoIdFromUrl from "utils/you-tube/getYouTubeVideoIdFromUrl";

export default function isYouTubeUrl(url: string): boolean {
  return getYouTubeVideoIdFromUrl(url) != null;
}
