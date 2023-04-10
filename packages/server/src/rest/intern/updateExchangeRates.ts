import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import getExchangeRates from "src/utils/getExchangeRates";
import is200StatusCode from "src/utils/is200StatusCode";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  CurrencyNameExpress_Enum,
  ExchangeRateCurrency,
} from "src/__generated__/generated";

const EXCHANGE_CURRENCIES = [
  ExchangeRateCurrency.Sol,
  ExchangeRateCurrency.Usdc,
];

export default async function updateExchangeRates(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const responses = await Promise.all([
    getExchangeRates(ExchangeRateCurrency.Usd, EXCHANGE_CURRENCIES),
    getExchangeRates(ExchangeRateCurrency.Sol, EXCHANGE_CURRENCIES),
  ]);
  const [usdRatesResponse, solRatesResponse] = responses;

  if (responses.some((response) => !is200StatusCode(response.status))) {
    logError(
      AnalyticsEvent.ExchangeRateError,
      "Query to exchange rate API did not succeed",
      req,
      { responses }
    );
    res.sendStatus(500);
    return;
  }

  const usdRates = usdRatesResponse.data[ExchangeRateCurrency.Usd];
  const solRates = solRatesResponse.data[ExchangeRateCurrency.Sol];

  const prisma = getPrisma();
  await prisma.$transaction([
    prisma.currency.update({
      data: {
        solRate: solRates[ExchangeRateCurrency.Sol],
        usdRate: usdRates[ExchangeRateCurrency.Sol],
      },
      where: {
        name: CurrencyNameExpress_Enum.Solana,
      },
    }),
    prisma.currency.update({
      data: {
        solRate: solRates[ExchangeRateCurrency.Usdc],
        usdRate: usdRates[ExchangeRateCurrency.Usdc],
      },
      where: {
        name: CurrencyNameExpress_Enum.UsdCoin,
      },
    }),
  ]);

  res.sendStatus(200);
}
