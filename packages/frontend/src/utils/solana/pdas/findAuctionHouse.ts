import { PublicKey } from "@solana/web3.js";
import { AUCTION_HOUSE } from "formfn-shared/dist/constants/SolanaConstants";

export default async function findAuctionHouse(
  creator: PublicKey,
  treasuryMint: PublicKey,
  auctionHouseProgramId: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress(
    [Buffer.from(AUCTION_HOUSE), creator.toBuffer(), treasuryMint.toBuffer()],
    auctionHouseProgramId
  );
}
