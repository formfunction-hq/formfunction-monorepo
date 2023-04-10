import { PublicKey } from "@solana/web3.js";
import { AUCTION_HOUSE } from "formfn-shared/dist/constants/SolanaConstants";

export default async function findAuctionHouseBuyerEscrow(
  auctionHouse: PublicKey,
  wallet: PublicKey,
  tokenMint: PublicKey,
  auctionHouseProgramId: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress(
    [
      Buffer.from(AUCTION_HOUSE),
      auctionHouse.toBuffer(),
      wallet.toBuffer(),
      tokenMint.toBuffer(),
    ],
    auctionHouseProgramId
  );
}
