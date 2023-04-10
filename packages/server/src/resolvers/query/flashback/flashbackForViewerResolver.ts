import {
  FlashbackForViewerInput,
  FlashbackForViewerResponse,
} from "src/__generated__/generated";
import MyContext from "src/types/MyContext";
import Typename from "src/types/enums/Typename";
import getFlashbackArtistStatsForUserId from "src/utils/flashback/getFlashbackArtistStatsForUserId";
import getFlashbackCollectorStatsForUserId from "src/utils/flashback/getFlashbackCollectorStatsForUserId";
import getViewerId from "src/utils/auth/getViewerId";
import invariant from "tiny-invariant";

export default async function flashbackForViewerResolver(
  context: MyContext,
  input: FlashbackForViewerInput
): Promise<FlashbackForViewerResponse> {
  const viewerId = getViewerId(context, input.viewerId);
  invariant(viewerId != null);

  const [artistStats, collectorStats] = await Promise.all([
    getFlashbackArtistStatsForUserId(viewerId),
    getFlashbackCollectorStatsForUserId(viewerId),
  ]);

  return {
    __typename: Typename.FlashbackForViewerResponse,
    artistStats,
    collectorStats,
  };
}
