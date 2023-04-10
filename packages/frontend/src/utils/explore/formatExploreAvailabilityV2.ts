import ExploreAvailabilityV2 from "types/enums/ExploreAvailabilityV2";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

export default function formatExploreAvailabilityV2(
  availability: ExploreAvailabilityV2
) {
  switch (availability) {
    case ExploreAvailabilityV2.InstantSale:
      return "Instant Sale";
    case ExploreAvailabilityV2.LiveAuctionWithBids:
      return "Live Auction (with bids)";
    case ExploreAvailabilityV2.LiveAuctionWithoutBids:
      return "Live Auction (without bids)";
    case ExploreAvailabilityV2.ReservePrice:
      return "Reserve Price";
    case ExploreAvailabilityV2.Sold:
      return "Sold";
    case ExploreAvailabilityV2.Available:
      return "Available";
    case ExploreAvailabilityV2.SoldOut:
      return "Sold Out";
    default:
      return assertUnreachable(availability);
  }
}
