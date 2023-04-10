import { PublicKey } from "@solana/web3.js";
import {
  AUCTION_HOUSE,
  FEE_PAYER,
} from "formfn-shared/dist/constants/SolanaConstants";

export default async function findAuctionHouseFeeAccount(
  auctionHouse: PublicKey,
  auctionHouseProgramId: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress(
    [
      Buffer.from(AUCTION_HOUSE),
      auctionHouse.toBuffer(),
      Buffer.from(FEE_PAYER),
    ],
    auctionHouseProgramId
  );
}
