import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";

export default function decodeAuctionHouseIxErrorHandler(
  txid: string,
  e: Error
): void {
  logError(AnalyticsEvent.DecodeIxError, e, null, { txid });
}
