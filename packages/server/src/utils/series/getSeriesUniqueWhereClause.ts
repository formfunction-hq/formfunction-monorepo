import { Prisma } from "@prisma/client";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import getPrisma from "src/utils/prisma/getPrisma";
import invariant from "tiny-invariant";

export default async function getSeriesUniqueWhereClause(
  creatorId: MaybeUndef<string>,
  creatorUsername: MaybeUndef<string>,
  seriesSlug: string
): Promise<Prisma.SeriesFindUniqueArgs["where"]> {
  if (creatorId != null) {
    return {
      creatorId_slug: {
        creatorId,
        slug: seriesSlug,
      },
    };
  }

  invariant(
    creatorUsername != null,
    "One of creatorId or creatorUsername must be specified"
  );
  const prisma = getPrisma();
  const creator = await prisma.user.findUnique({
    where: { username: creatorUsername },
  });

  return {
    creatorId_slug: {
      creatorId: creator?.id ?? "",
      slug: seriesSlug,
    },
  };
}
