import dayjs from "src/utils/dates/dayjsex";
import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function creatorStats(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const prisma = getPrisma();
  const { afterTime, creatorAddress, limit, offset } = req.query;
  const afterTimeDayjs =
    afterTime == null ? dayjs("2017") : dayjs(afterTime as string);

  if (creatorAddress == null) {
    const topCreators = await prisma.$queryRaw`
SELECT
  "creatorId",
  "User".username AS "username",
  SUM(price)::bigint AS "totalSales",
  COUNT(DISTINCT "toUserId") AS "collectorCount",
  COUNT(DISTINCT mint) AS "nftsSold"
FROM
  "NftTransaction"
JOIN "User"
  ON "NftTransaction"."creatorId" = "User".id
WHERE
  type = 'Sold'
  AND "NftTransaction"."timeCreated" >= ${afterTimeDayjs.toDate()}
GROUP BY
  "creatorId", "User".username
ORDER BY
  "totalSales" DESC
LIMIT ${limit == null ? 100 : Number(limit)}
OFFSET ${offset == null ? 0 : Number(offset)}
  `;

    res.json({ topCreators });

    return;
  }

  const creatorStatsResult = await prisma.$queryRaw`
SELECT
  "creatorId",
  "User".username AS "username",
  SUM(price)::bigint AS "totalSales",
  COUNT(DISTINCT "toUserId") AS "collectorCount",
  COUNT(DISTINCT mint) AS "nftsSold"
FROM
  "NftTransaction"
JOIN "User"
  ON "NftTransaction"."creatorId" = "User".id
WHERE
  type = 'Sold'
  AND "NftTransaction"."timeCreated" >= ${afterTimeDayjs.toDate()}
  AND "creatorId" = ${creatorAddress}
GROUP BY
  "creatorId", "User".username
ORDER BY
  "totalSales" DESC
`;

  res.json({ creatorStats: creatorStatsResult });
}
