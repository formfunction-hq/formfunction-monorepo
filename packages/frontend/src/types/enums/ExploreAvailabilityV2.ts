/* eslint-disable typescript-sort-keys/string-enum */

enum ExploreAvailabilityV2 {
  LiveAuctionWithBids = "LiveAuctionWithBids",
  LiveAuctionWithoutBids = "LiveAuctionWithoutBids",
  ReservePrice = "ReservePrice",
  InstantSale = "InstantSale",
  Sold = "Sold",

  // Editions-specific (for now)
  Available = "Available",
  SoldOut = "SoldOut",
}

export default ExploreAvailabilityV2;
