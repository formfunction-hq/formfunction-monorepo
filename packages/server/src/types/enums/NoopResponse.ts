// Enum for static, reusable no-op response message reasons.
enum NoopResponse {
  AuctionNftNull = "No action taken - auctionNft was null.",
  NftListingNull = "No action taken - nftListing was null.",
  NonMatchingTransactionType = "No action taken - does not match expected transaction type.",
  NotPrimarySaleTransaction = "No action taken - this is not a primary sale transaction.",
}

export default NoopResponse;
