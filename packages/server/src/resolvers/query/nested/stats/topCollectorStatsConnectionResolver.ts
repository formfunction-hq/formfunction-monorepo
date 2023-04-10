import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  CollectorStatsConnection,
  TopCollectorStatsInput,
} from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import { Prisma } from "@prisma/client";
import validateFirstInput from "src/utils/validation/validateFirstInput";
import convertUser from "src/utils/convert/convertUser";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import SOLD_TRANSACTION_TYPES from "src/constants/SoldTransactionTypes";
import getCurrencyPriceConversionCaseClause from "src/utils/stats/getCurrencyPriceConversionCaseClause";

export default async function topCollectorStatsConnectionResolver(
  context: Undef<MyContext>,
  after: Maybe<string>,
  first: number,
  input: TopCollectorStatsInput
): Promise<CollectorStatsConnection> {
  validateFirstInput(first);
  const prisma = getPrisma();
  const afterNumber = after == null ? 0 : Number(after);
  const { afterTime } = input;
  const afterTimeDayjs = dayjs(afterTime);

  const query = Prisma.sql`
    SELECT
      "toUserId" AS "collectorId",
      SUM(
        ${await getCurrencyPriceConversionCaseClause("price")}
      ) :: bigint AS "totalPaidInSol",
      COUNT(DISTINCT "fromUserId") AS "numCreatorsSupported",
      COUNT(DISTINCT mint) AS "numPiecesBought"
    FROM
      "NftTransaction"
    WHERE
      type IN (${Prisma.join(SOLD_TRANSACTION_TYPES)})
      AND "source" IS NULL
      AND "timeCreated" >= ${afterTimeDayjs.toDate()}::TIMESTAMP WITH TIME ZONE
    GROUP BY
      "toUserId"
    ORDER BY
      "totalPaidInSol" DESC
    LIMIT ${first}::int
    OFFSET ${afterNumber}::int
  `;
  const countQuery = Prisma.sql`
    SELECT
      COUNT(DISTINCT "toUserId") AS "numCollectorsTotal"
    FROM
      "NftTransaction"
    WHERE
      type LIKE 'Sold%'
      AND "source" IS NULL
      AND "timeCreated" >= ${afterTimeDayjs.toDate()}::TIMESTAMP WITH TIME ZONE
  `;
  const rawQueryResultPromise: Promise<
    Array<{
      collectorId: string;
      numCreatorsSupported: BigInt;
      numPiecesBought: BigInt;
      totalPaidInSol: BigInt;
    }>
  > = prisma.$queryRaw(query);
  const totalCountQueryResultPromise: Promise<
    Array<{ numCollectorsTotal: BigInt }>
  > = prisma.$queryRaw(countQuery);
  const [rawQueryResult, [totalCount]] = await Promise.all([
    rawQueryResultPromise,
    totalCountQueryResultPromise,
  ]);
  const nodes = await Promise.all(
    rawQueryResult.map(async (result) => {
      const collector = await prisma.user.findUnique({
        include: CONVERT_USER_INCLUDE,
        where: { id: result.collectorId },
      });
      return {
        __typename: Typename.CollectorStats as const,
        collector: convertUser(collector!),
        numCreatorsSupported: Number(result.numCreatorsSupported),
        numPiecesBought: Number(result.numPiecesBought),
        totalPaidInSol: Number(result.totalPaidInSol),
      };
    })
  );

  return createOffsetPaginationConnection(
    nodes,
    Typename.CollectorStatsEdge,
    Typename.CollectorStatsConnection,
    after,
    first,
    Number(totalCount.numCollectorsTotal)
  );
}
