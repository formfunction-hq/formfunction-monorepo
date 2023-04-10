export type NftListingFields = {
  auctionDurationInSeconds?: any;
  auctionEndTime?: any;
  isPnftDropActive?: any;
  pnftIdForAuction?: any;
  priceInLamports?: any;
  scheduledAuctionTime?: any;
  timeExtensionDurationInSeconds?: any;
};

export default function getNftListingFieldsFromObject<
  T extends NftListingFields
>(obj: T) {
  return (({
    auctionDurationInSeconds,
    auctionEndTime,
    isPnftDropActive,
    pnftIdForAuction,
    priceInLamports,
    scheduledAuctionTime,
    timeExtensionDurationInSeconds,
  }) => ({
    auctionDurationInSeconds,
    auctionEndTime,
    isPnftDropActive,
    pnftIdForAuction,
    priceInLamports,
    scheduledAuctionTime,
    timeExtensionDurationInSeconds,
  }))(obj);
}
