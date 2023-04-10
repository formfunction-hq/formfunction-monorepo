import { Dayjs } from "dayjs";
import { Duration } from "dayjs/plugin/duration";

/**
 * Assuming the auction originally ended at originalTimeAuctionEnd,
 * did the bid placed at timeOfBid extend the auction?
 */
export default function didExtendAuction(
  originalTimeAuctionEnd: Dayjs,
  timeOfBid: Dayjs,
  timeOfPreviousBid: Dayjs,
  timeExtensionDuration: Duration
): boolean {
  const diff = originalTimeAuctionEnd.diff(timeOfBid, "seconds", true);

  // Bid was placed before the auction's original end time.
  // For example:
  // Assuming these params:
  // - Auction duration: 30
  // - Time extension duration: 10
  //
  // LEGEND
  // - * is a bid
  // - | just marks a time
  //
  // ------------------------------------
  //    *                      *    *   |
  //  -30                     -5   -2   0
  //
  // Bids at -5 and -2 qualify
  if (diff > 0 && diff < timeExtensionDuration.asSeconds()) {
    return true;
  }

  // Bid was placed at or after the auction's original end time.
  // If this is true, the time between the bid and the previous bid must be
  // less than the time extension duration.
  if (
    diff <= 0 &&
    timeOfBid.diff(timeOfPreviousBid, "seconds", true) <
      timeExtensionDuration.asSeconds()
  ) {
    return true;
  }

  return false;
}
