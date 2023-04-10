import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { SpotlightsConnection } from "src/__generated__/generated";
import dayjs from "formfn-shared/dist/utils/dates/dayjsex";
import { Prisma } from "@prisma/client";
import getSpotlightsConnectionForWhereClause from "src/utils/spotlights/getSpotlightsConnectionByStartAndEndTime";

export default async function recentSpotlightsConnectionResolver(
  context: MyContext,
  after: Maybe<string>,
  first: number
): Promise<SpotlightsConnection> {
  const currentTime = dayjs();
  const where: Prisma.SpotlightWhereInput = {
    endTime: { lt: currentTime.toDate() },
  };
  return getSpotlightsConnectionForWhereClause(where, after, first, {
    startTime: "desc",
  });
}
