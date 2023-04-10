import {
  FlashbackForUsernameInput,
  FlashbackForUsernameResponse,
} from "src/__generated__/generated";
import MyContext from "src/types/MyContext";
import Typename from "src/types/enums/Typename";
import getFlashbackArtistStatsForUserId from "src/utils/flashback/getFlashbackArtistStatsForUserId";
import getFlashbackCollectorStatsForUserId from "src/utils/flashback/getFlashbackCollectorStatsForUserId";
import getPrisma from "src/utils/prisma/getPrisma";
import invariant from "tiny-invariant";

export default async function flashbackForUsernameResolver(
  _context: MyContext,
  input: FlashbackForUsernameInput
): Promise<FlashbackForUsernameResponse> {
  invariant(input.check === "bananas");
  const user = await getPrisma().user.findUnique({
    where: {
      username: input.username,
    },
  });

  const [artistStats, collectorStats] = await Promise.all([
    getFlashbackArtistStatsForUserId(user!.id),
    getFlashbackCollectorStatsForUserId(user!.id),
  ]);

  return {
    __typename: Typename.FlashbackForUsernameResponse,
    artistStats,
    collectorStats,
  };
}
