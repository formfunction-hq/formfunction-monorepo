import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  CreatorStatsConnection,
  TopCreatorStatsInput,
} from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import { Prisma } from "@prisma/client";
import validateFirstInput from "src/utils/validation/validateFirstInput";
import convertUser from "src/utils/convert/convertUser";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import getCurrencyPriceConversionCaseClause from "src/utils/stats/getCurrencyPriceConversionCaseClause";
import SOLD_TRANSACTION_TYPES from "src/constants/SoldTransactionTypes";

export default async function topCreatorStatsConnectionResolver(
  context: Undef<MyContext>,
  after: Maybe<string>,
  first: number,
  input: TopCreatorStatsInput
): Promise<CreatorStatsConnection> {
  validateFirstInput(first);
  const prisma = getPrisma();
  const afterNumber = after == null ? 0 : Number(after);
  const { afterTime } = input;
  const afterTimeDayjs = dayjs(afterTime);

  const query = Prisma.sql`
    SELECT
      "creatorId",
      SUM(
        ${await getCurrencyPriceConversionCaseClause("price")}
      ) :: bigint AS "totalSalesInSol",
      COUNT(DISTINCT "toUserId") AS "numCollectors",
      COUNT(DISTINCT mint) AS "numPiecesSold"
    FROM
      "NftTransaction"
    WHERE
      type LIKE 'Sold%'
      AND "source" IS NULL
      AND "timeCreated" >= ${afterTimeDayjs.toDate()}::TIMESTAMP WITH TIME ZONE
    GROUP BY
      "creatorId"
    ORDER BY
      "totalSalesInSol" DESC
    LIMIT ${first}::int
    OFFSET ${afterNumber}::int
  `;
  const countQuery = Prisma.sql`
    SELECT
      COUNT(DISTINCT "creatorId") AS "numCreatorsTotal"
    FROM
      "NftTransaction"
    WHERE
      type in (${Prisma.join(SOLD_TRANSACTION_TYPES)})
      AND "source" IS NULL
      AND "timeCreated" >= ${afterTimeDayjs.toDate()}::TIMESTAMP WITH TIME ZONE
  `;
  const rawQueryResultPromise: Promise<
    Array<{
      creatorId: string;
      numCollectors: BigInt;
      numPiecesSold: BigInt;
      totalSalesInSol: BigInt;
    }>
  > = prisma.$queryRaw(query);
  const totalCountQueryResultPromise: Promise<
    Array<{ numCreatorsTotal: BigInt }>
  > = prisma.$queryRaw(countQuery);
  const [rawQueryResult, [totalCount]] = await Promise.all([
    rawQueryResultPromise,
    totalCountQueryResultPromise,
  ]);
  const nodes = await Promise.all(
    rawQueryResult.map(async (result) => {
      const collector = await prisma.user.findUnique({
        include: CONVERT_USER_INCLUDE,
        where: { id: result.creatorId },
      });
      return {
        __typename: Typename.CreatorStats as const,
        creator: convertUser(collector!),
        numCollectors: Number(result.numCollectors),
        numPiecesSold: Number(result.numPiecesSold),
        totalSalesInSol: Number(result.totalSalesInSol),
      };
    })
  );

  return createOffsetPaginationConnection(
    nodes,
    Typename.CreatorStatsEdge,
    Typename.CreatorStatsConnection,
    after,
    first,
    Number(totalCount.numCreatorsTotal)
  );
}
