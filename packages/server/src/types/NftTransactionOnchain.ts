import { NftTransactionExpress } from "src/__generated__/generated";

/**
 * We use this type when we parse transactions directly from onchain data.
 */
type NftTransactionOnchain = Omit<
  NftTransactionExpress,
  | "Creator"
  | "From"
  | "To"
  | "__typename"
  | "auctionCount"
  | "comment"
  | "nftInfo"
>;

export default NftTransactionOnchain;
