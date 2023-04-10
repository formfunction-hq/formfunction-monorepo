import {
  ExchangeRateCurrency,
  ExchangeRateInput,
  ExchangeRateResponse,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import Typename from "src/types/enums/Typename";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import MyContext from "src/types/MyContext";
import { ExchangeRates, PrismaClient } from "@prisma/client";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { Decimal } from "@prisma/client/runtime";
import { __InputValue } from "graphql";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

const NULL_RESPONSE: ExchangeRateResponse = {
  __typename: Typename.ExchangeRateResponse,
  rate: null,
};

function isSupportedPair(
  baseCurrency: ExchangeRateCurrency,
  exchangeCurrency: ExchangeRateCurrency
) {
  return (
    baseCurrency === ExchangeRateCurrency.Sol &&
    exchangeCurrency === ExchangeRateCurrency.Usd
  );
}

function getRateKeyForCurrency(
  exchangeCurrency: ExchangeRateCurrency
): keyof ExchangeRates {
  // TODO: revisit this later down the line when we need
  // to add more currencies
  switch (exchangeCurrency) {
    case ExchangeRateCurrency.Usd:
      return "toUsdRate";
    case ExchangeRateCurrency.Sol:
    case ExchangeRateCurrency.Usdc:
      throw new Error("Unsupported exchange currency");
    default:
      return assertUnreachable(exchangeCurrency);
  }
}

function getResponse(
  context: MyContext,
  rate: MaybeUndef<Decimal>
): ExchangeRateResponse {
  if (rate == null) {
    logError(
      AnalyticsEvent.ExchangeRateError,
      "Exchange rate is null",
      context.req,
      { rate }
    );
    return NULL_RESPONSE;
  }

  return {
    __typename: Typename.ExchangeRateResponse,
    rate: Number(rate.toDP(8)),
  };
}

async function getRate(
  baseCurrency: ExchangeRateCurrency,
  exchangeCurrency: ExchangeRateCurrency,
  context: MyContext,
  prisma: PrismaClient
): Promise<ExchangeRateResponse> {
  const rateKey = getRateKeyForCurrency(exchangeCurrency);

  const exchangeRate: MaybeUndef<ExchangeRates> =
    await prisma.exchangeRates.findUnique({
      where: { name: baseCurrency.toString() },
    });

  if (exchangeRate == null) {
    logError(
      AnalyticsEvent.ExchangeRateError,
      "Exchange rate could not be fetched",
      context.req,
      {
        baseCurrency,
        exchangeCurrency,
        rateKey,
      }
    );
    return NULL_RESPONSE;
  }

  return getResponse(context, exchangeRate[rateKey] as MaybeUndef<Decimal>);
}

export default async function exchangeRateResolver(
  context: MyContext,
  input: ExchangeRateInput
): Promise<ExchangeRateResponse> {
  const { baseCurrency, exchangeCurrency } = input;
  const prisma = getPrisma();
  if (!isSupportedPair(baseCurrency, exchangeCurrency)) {
    logError(
      AnalyticsEvent.ExchangeRateError,
      `Currency pair ${baseCurrency}:${exchangeCurrency} not supported!`,
      context.req,
      { input }
    );
    return NULL_RESPONSE;
  }

  return getRate(baseCurrency, exchangeCurrency, context, prisma);
}
