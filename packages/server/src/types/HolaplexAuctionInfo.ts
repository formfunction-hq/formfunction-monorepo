import NftTransactionOnchain from "src/types/NftTransactionOnchain";

type HolaplexAuctionInfo = {
  auctionAddress: string;
  limitedEditionMint?: string;
  masterEditionMint: string;
  masterEditionUpdateAuthority: string;
  transactions: Array<NftTransactionOnchain>;
};

export default HolaplexAuctionInfo;
