import { PublicKey } from "@solana/web3.js";
import { AUCTION_HOUSE } from "formfn-shared/dist/constants/SolanaConstants";

export default async function findAuctionHouseProgramAsSigner(
  auctionHouseProgramId: PublicKey
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress(
    [Buffer.from(AUCTION_HOUSE), Buffer.from("signer")],
    auctionHouseProgramId
  );
}
