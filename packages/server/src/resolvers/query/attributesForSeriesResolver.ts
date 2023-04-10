import {
  AttributesForSeriesInput,
  AttributesForSeriesResponse,
} from "src/__generated__/generated";
import MyContext from "src/types/MyContext";
import Typename from "src/types/enums/Typename";
import getPrisma from "src/utils/prisma/getPrisma";
import getSeriesUniqueWhereClause from "src/utils/series/getSeriesUniqueWhereClause";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import groupBy from "formfn-shared/dist/utils/array/groupBy";

export default async function attributesForSeriesResolver(
  _context: MyContext,
  input: AttributesForSeriesInput
): Promise<Maybe<AttributesForSeriesResponse>> {
  const prisma = getPrisma();
  const seriesWhere = await getSeriesUniqueWhereClause(
    input.creatorId,
    input.creatorUsername,
    input.seriesSlug
  );
  const series = await prisma.series.findUnique({ where: seriesWhere });
  if (series == null) {
    return null;
  }

  // NOTE: may need to reconsider this approach if it ends up being too slow (e.g. may want to
  // pre-compute all this info and store it somewhere, since it shouldn't change)
  const nfts = await prisma.nft.findMany({
    include: {
      NftToAttribute: {
        include: {
          Attribute: true,
        },
      },
    },
    where: {
      seriesId: series.id,
    },
  });
  const allAttributes = nfts.flatMap((nft) => nft.NftToAttribute);
  const attributesGrouped = groupBy(allAttributes, (attribute) =>
    JSON.stringify(attribute.Attribute)
  );
  const traits = Object.keys(attributesGrouped).map((key) => {
    const traitsForKey = attributesGrouped[key];
    return {
      __typename: Typename.AttributesForSeriesTrait as const,
      count: traitsForKey.length,
      traitName: traitsForKey[0].Attribute.traitType,
      traitValue: traitsForKey[0].Attribute.value,
    };
  });

  return {
    __typename: Typename.AttributesForSeriesResponse,
    traits,
  };
}
