import { PublicKey } from "@solana/web3.js";

type AuctionHouseConstants = {
  antiBotAuthority: PublicKey;
  authority: PublicKey;
  feeAccount: PublicKey;
  programId: PublicKey;
};

export default AuctionHouseConstants;
