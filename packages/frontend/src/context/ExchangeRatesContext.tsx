import {
  Context,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import graphql from "babel-plugin-relay/macro";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { fetchQuery } from "react-relay";
import RelayEnvironment from "utils/relay/RelayEnvironment";
import { ExchangeRatesContextQuery } from "context/__generated__/ExchangeRatesContextQuery.graphql";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import Currency from "types/relay/Currency";
import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import flattenArrayOfObjectsToObject from "formfn-shared/dist/utils/object/flattenArrayOfObjectsToObject";

export type ExchangeRatesContextData = {
  priceToSol: (price: number, currency: Currency) => Maybe<string>;
  priceToUsd: (price: number, currency: Currency) => Maybe<string>;
};

export const ExchangeRatesContext: Context<ExchangeRatesContextData> =
  createContext<ExchangeRatesContextData>({
    priceToSol: (_price: number, _currency: Currency) => null,
    priceToUsd: (_price: number, _currency: Currency) => null,
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

const exchangeRateQuery = graphql`
  query ExchangeRatesContextQuery {
    Currency {
      name
      usdRate
      solRate
    }
  }
`;

function convertPrice(price: number, rate: MaybeUndef<number>) {
  if (rate == null) {
    return null;
  }
  const convertedPrice = price / rate;
  return convertedPrice.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

export function ExchangeRatesContextProvider(
  props: ProviderProps
): JSX.Element {
  const [usdRates, setUsdRates] = useState<
    Record<Currency, MaybeUndef<number>>
  >({
    Ash: null,
    Bonk: null,
    FamousFoxFederation: null,
    Particles: null,
    [RELAY_FUTURE_ADDED_VALUE]: null,
    SkeletonCrew: null,
    Solana: null,
    UsdCoin: null,
  });
  const [solRates, setSolRates] = useState<
    Record<Currency, MaybeUndef<number>>
  >({
    Ash: null,
    Bonk: null,
    FamousFoxFederation: null,
    Particles: null,
    [RELAY_FUTURE_ADDED_VALUE]: null,
    SkeletonCrew: null,
    Solana: null,
    UsdCoin: null,
  });

  const priceToUsd = useCallback(
    (price: number, currency: Currency) => {
      const toUsdRate = usdRates[currency];
      return convertPrice(price, toUsdRate);
    },
    [usdRates]
  );
  const priceToSol = useCallback(
    (price: number, currency: Currency) => {
      const toSolRate = solRates[currency];
      return convertPrice(price, toSolRate);
    },
    [solRates]
  );

  useEffect(() => {
    async function run() {
      try {
        const exchangeRateData = await fetchQuery<ExchangeRatesContextQuery>(
          RelayEnvironment,
          exchangeRateQuery,
          { input: {} }
        ).toPromise();

        if (exchangeRateData?.Currency == null) {
          logError(
            AnalyticsEvent.ExchangeRatesError,
            "exchange rates were returned as null",
            { exchangeRateData }
          );
          return;
        }
        const usdRatesAsObject = flattenArrayOfObjectsToObject(
          exchangeRateData.Currency.map((cur) => ({ [cur.name]: cur.usdRate }))
        );
        const solRatesAsObject = flattenArrayOfObjectsToObject(
          exchangeRateData.Currency.map((cur) => ({ [cur.name]: cur.solRate }))
        );

        setUsdRates(usdRatesAsObject);
        setSolRates(solRatesAsObject);
      } catch (e) {
        logError(AnalyticsEvent.ExchangeRatesError, e as Error);
      }
    }

    run();
  }, []);

  return (
    <ExchangeRatesContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ priceToSol, priceToUsd }}
    >
      {props.children}
    </ExchangeRatesContext.Provider>
  );
}
