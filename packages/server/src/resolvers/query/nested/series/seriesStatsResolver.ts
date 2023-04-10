import { Prisma } from "@prisma/client";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  NftStatusExpress_Enum,
  SeriesStatsInput,
  SeriesStatsResponse,
} from "src/__generated__/generated";
import getCurrencyPriceConversionCaseClause from "src/utils/stats/getCurrencyPriceConversionCaseClause";
import SOLD_TRANSACTION_TYPES from "src/constants/SoldTransactionTypes";
import bigintToNumber from "src/utils/bigintToNumber";
import getSeriesUniqueWhereClause from "src/utils/series/getSeriesUniqueWhereClause";

async function getSeries(input: SeriesStatsInput) {
  const where = await getSeriesUniqueWhereClause(
    input.creatorId,
    input.creatorUsername,
    input.seriesSlug
  );
  return getPrisma().series.findUnique({
    where,
  });
}

export default async function seriesStatsResolver(
  _context: Undef<MyContext>,
  input: SeriesStatsInput
): Promise<Maybe<SeriesStatsResponse>> {
  const series = await getSeries(input);

  if (series == null) {
    // Accounts for the case when someone passes up invalid input (e.g. if a user navigates to an invalid series URL).
    return null;
  }

  const prisma = getPrisma();

  const volumeQuery = Prisma.sql`
    SELECT
      SUM(
        ${await getCurrencyPriceConversionCaseClause("price")}
      ) :: bigint AS "totalVolumeInLamports"
    FROM
      "NftTransaction"
    JOIN "Nft"
      ON "NftTransaction".mint = "Nft".id
    LEFT JOIN "Nft" "NftMaster"
      ON "Nft"."masterEditionMint" = "NftMaster"."mint"
    WHERE
      type IN (${Prisma.join(SOLD_TRANSACTION_TYPES)})
      AND ("Nft"."seriesId" = ${series.id}
        OR ("NftMaster"."seriesId" = ${series.id}
          AND NOT "Nft"."isPnft"))
  `;
  const floorPriceQuery = Prisma.sql`
    SELECT
      MIN(
        ${await getCurrencyPriceConversionCaseClause("priceInLamports")}
      ) :: bigint AS "floorPriceInLamports"
    FROM
      "Nft"
    JOIN "NftListing"
      ON "Nft".id = "NftListing"."nftId"
    LEFT JOIN "Nft" "NftMaster"
      ON "Nft"."masterEditionMint" = "NftMaster"."mint"
    WHERE
      ("Nft"."seriesId" = ${series.id}
        OR ("NftMaster"."seriesId" = ${series.id}
          AND NOT "Nft"."isPnft"))
      AND "Nft".status IN (${Prisma.join([
        NftStatusExpress_Enum.Listed,
        NftStatusExpress_Enum.ListedEditions,
        NftStatusExpress_Enum.ListedInstantSale,
        NftStatusExpress_Enum.ListingScheduled,
      ])})
  `;

  const volumeQueryResultPromise: Promise<
    Array<{
      totalVolumeInLamports: Maybe<BigInt>;
    }>
  > = prisma.$queryRaw(volumeQuery);
  const floorPriceQueryResultPromise: Promise<
    Array<{
      floorPriceInLamports: Maybe<BigInt>;
    }>
  > = prisma.$queryRaw(floorPriceQuery);

  const [volumeQueryResult, floorPriceQueryResult] = await Promise.all([
    volumeQueryResultPromise,
    floorPriceQueryResultPromise,
  ]);

  return {
    __typename: Typename.SeriesStatsResponse,
    floorPriceInLamports:
      floorPriceQueryResult.length === 0
        ? null
        : bigintToNumber(floorPriceQueryResult[0].floorPriceInLamports),
    volumeInLamports:
      volumeQueryResult.length === 0
        ? 0
        : bigintToNumber(volumeQueryResult[0].totalVolumeInLamports) ?? 0,
  };
}
