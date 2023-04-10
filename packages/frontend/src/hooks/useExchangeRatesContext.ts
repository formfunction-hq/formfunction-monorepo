import {
  ExchangeRatesContext,
  ExchangeRatesContextData,
} from "context/ExchangeRatesContext";

import { useContext } from "react";

export default function useExchangeRatesContext(): ExchangeRatesContextData {
  return useContext(ExchangeRatesContext);
}
