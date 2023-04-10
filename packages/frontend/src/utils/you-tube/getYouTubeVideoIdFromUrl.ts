import { Maybe } from "graphql/jsutils/Maybe";
import YOUTUBE_REG_EXP from "utils/you-tube/youTubeRegExp";

export default function getYouTubeVideoIdFromUrl(url: string): Maybe<string> {
  const match = url.match(YOUTUBE_REG_EXP);
  return (match && match[2].length === 11 && match[2]) || null;
}
