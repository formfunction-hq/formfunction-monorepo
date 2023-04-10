import { Prisma } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import Typename from "src/types/enums/Typename";
import { SpotlightSourceType } from "src/types/graphql-source/SpotlightSourceType";
import convertSpotlight from "src/utils/convert/convertSpotlight";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function getSpotlightsConnectionForWhereClause(
  where: Prisma.SpotlightWhereInput,
  after: Maybe<string>,
  first: number,
  orderBy?: Prisma.SpotlightOrderByWithRelationInput
) {
  const prisma = getPrisma();
  const afterNumber = after == null ? 0 : Number(after);
  const [activeSpotlights, totalCount] = await Promise.all([
    prisma.spotlight.findMany({
      orderBy: orderBy ?? { startTime: "asc" },
      skip: afterNumber,
      take: first,
      where,
    }),
    prisma.spotlight.count({ where }),
  ]);

  const spotlightNodes: Array<SpotlightSourceType> =
    activeSpotlights.map(convertSpotlight);

  return createOffsetPaginationConnection(
    spotlightNodes,
    Typename.SpotlightsEdge,
    Typename.SpotlightsConnection,
    after,
    first,
    totalCount
  );
}
