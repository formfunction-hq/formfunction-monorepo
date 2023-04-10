import { PublicKey } from "@solana/web3.js";
import {
  AUCTION_HOUSE,
  TREASURY,
} from "formfn-shared/dist/constants/SolanaConstants";

export default async function findAuctionHouseTreasuryAccount(
  auctionHouse: PublicKey,
  auctionHouseProgramId: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress(
    [
      Buffer.from(AUCTION_HOUSE),
      auctionHouse.toBuffer(),
      Buffer.from(TREASURY),
    ],
    auctionHouseProgramId
  );
}
