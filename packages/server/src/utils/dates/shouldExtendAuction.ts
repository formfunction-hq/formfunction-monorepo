import { Dayjs } from "dayjs";
import { Duration } from "dayjs/plugin/duration";

/**
 * Assuming the auction ends at timeAuctionEnd, should a bid placed at timeOfBid extend
 * the auction?
 */
export default function shouldExtendAuction(
  timeAuctionEnd: Dayjs,
  timeOfBid: Dayjs,
  timeExtensionDuration: Duration,
  useTransactionBlockTime: boolean,
  validateBidBufferDuration: Duration
): boolean {
  const bidPlacedInTimeExtensionWindow =
    timeAuctionEnd.diff(timeOfBid, "seconds", true) <
    timeExtensionDuration.asSeconds();
  const shouldExtend = useTransactionBlockTime
    ? timeOfBid.isBefore(timeAuctionEnd)
    : timeOfBid.subtract(validateBidBufferDuration).isBefore(timeAuctionEnd);

  return bidPlacedInTimeExtensionWindow && shouldExtend;
}
