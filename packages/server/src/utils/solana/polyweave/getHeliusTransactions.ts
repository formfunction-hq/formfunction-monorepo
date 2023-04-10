import axios from "axios";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import HeliusTransaction from "src/types/HeliusTransaction";
import logError from "src/utils/analytics/logError";
import dayjs from "src/utils/dates/dayjsex";

const HELIUS_API_KEY = "REPLACEME";

export default async function getHeliusTransactions(
  address: string
): Promise<Array<HeliusTransaction>> {
  try {
    const response = await axios.get(
      `https://api.helius.xyz/v0/addresses/${address}/nft-events?api-key=${HELIUS_API_KEY}`
    );

    const { data } = response;

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((obj: any) => ({
      ...obj,
      context: obj.context ?? obj.saleType,
      timestamp: dayjs.unix(obj.timestamp),
    }));
  } catch (e) {
    logError(AnalyticsEvent.HeliusError, e as Error, null, {
      address,
    });
    return [];
  }
}
