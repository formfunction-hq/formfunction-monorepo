import { Prisma } from "@prisma/client";
import axios from "axios";
import { NextFunction, Request, Response } from "express";
import dayjs from "src/utils/dates/dayjsex";
import getPrisma from "src/utils/prisma/getPrisma";
import { CurrencyNameExpress_Enum } from "src/__generated__/generated";

/**
 * The plan is to call this endpoint with every day of the year (e.g. 1 through 365).
 *
 * This approach minimizes the number of API calls we need to make to CryptoCompare (only 365),
 * and also makes batch updates easy.
 */
export default async function backfillNftTransactionUsdPriceEndpoint(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { dayOfYear } = req.body;
  const time = dayjs().tz("GMT").startOf("year").add(dayOfYear, "day");
  const timeDayAhead = time.add(1, "day");
  const unixTime = time.unix();

  // See https://min-api.cryptocompare.com/documentation?key=Historical&cat=dataHistoday for documentation
  const api = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=USD&tsym=SOL&limit=1&toTs=${unixTime}&api_key=8e0ddb698eac117fd1a3d89969720f66f33ee2dac08cabee81a4bc7c37e570d9`;
  const response = await axios.get(api);
  const lowRate = response.data.Data.Data.find(
    (data: any) => data.time === unixTime
  )!.low;
  const solMultiple = 1 / lowRate;

  const prisma = getPrisma();
  const solCurrency = await prisma.currency.findUnique({
    where: {
      name: CurrencyNameExpress_Enum.Solana,
    },
  });
  const usdcCurrency = await prisma.currency.findUnique({
    where: {
      name: CurrencyNameExpress_Enum.UsdCoin,
    },
  });

  // First, update all usdPrice values to be the same as price.
  // This is so we can use Prisma's atomic number operations.
  const update1 = Prisma.sql`UPDATE "NftTransaction"
    SET "usdPrice" = "price"
    WHERE "timeCreated" >= ${time.format()}::timestamp
    AND "timeCreated" < ${timeDayAhead.format()}::timestamp`;

  // Next, update all USDC transactions to be the correct value
  const timeCreatedFilter = {
    gte: time.toDate(),
    lt: timeDayAhead.toDate(),
  };
  const update2 = prisma.nftTransaction.updateMany({
    data: {
      usdPrice: {
        divide: 10 ** usdcCurrency!.decimals,
      },
    },
    where: {
      Currency: {
        name: CurrencyNameExpress_Enum.UsdCoin,
      },
      timeCreated: timeCreatedFilter,
    },
  });

  // Then, update all SOL transactions to be the correct value
  const update3 = prisma.nftTransaction.updateMany({
    data: {
      usdPrice: {
        multiply: (1 / 10 ** solCurrency!.decimals) * solMultiple,
      },
    },
    where: {
      Currency: {
        name: CurrencyNameExpress_Enum.Solana,
      },
      timeCreated: timeCreatedFilter,
    },
  });

  // Then, update all other transactions to have null usdPrice (since in update1,
  // we set all usdPrice values to be the same as price)
  const update4 = prisma.nftTransaction.updateMany({
    data: {
      usdPrice: null,
    },
    where: {
      Currency: {
        name: {
          notIn: [
            CurrencyNameExpress_Enum.Solana,
            CurrencyNameExpress_Enum.UsdCoin,
          ],
        },
      },
      timeCreated: timeCreatedFilter,
    },
  });

  await prisma.$transaction([
    prisma.$executeRaw(update1),
    update2,
    update3,
    update4,
  ]);
  res.sendStatus(200);
}
