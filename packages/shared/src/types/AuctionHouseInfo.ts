import { PublicKey } from "@solana/web3.js";

type AuctionHouseInfo = {
  auctionHouse: PublicKey;
  treasuryMint: PublicKey;
};

export default AuctionHouseInfo;
