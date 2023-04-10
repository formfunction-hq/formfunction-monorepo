import axios from "axios";
import { ExchangeRateCurrency } from "src/__generated__/generated";

const API_KEY =
  "8e0ddb698eac117fd1a3d89969720f66f33ee2dac08cabee81a4bc7c37e570d9";

export default async function getExchangeRates(
  baseCurrency: ExchangeRateCurrency,
  exchangeCurrencies: Array<ExchangeRateCurrency>
) {
  return axios.get(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${baseCurrency}&tsyms=${exchangeCurrencies.join(
      ","
    )}&api_key=${API_KEY}`
  );
}
