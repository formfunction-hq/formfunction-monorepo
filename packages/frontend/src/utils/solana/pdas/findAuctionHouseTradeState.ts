import { BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { AUCTION_HOUSE } from "formfn-shared/dist/constants/SolanaConstants";

export default async function findAuctionHouseTradeState(
  auctionHouse: PublicKey,
  wallet: PublicKey,
  tokenAccount: PublicKey,
  treasuryMint: PublicKey,
  tokenMint: PublicKey,
  auctionHouseProgramId: PublicKey,
  tokenSize: BN,
  buyPrice: BN
): Promise<[PublicKey, number]> {
  return PublicKey.findProgramAddress(
    [
      Buffer.from(AUCTION_HOUSE),
      wallet.toBuffer(),
      auctionHouse.toBuffer(),
      tokenAccount.toBuffer(),
      treasuryMint.toBuffer(),
      tokenMint.toBuffer(),
      buyPrice.toArrayLike(Buffer, "le", 8),
      tokenSize.toArrayLike(Buffer, "le", 8),
    ],
    auctionHouseProgramId
  );
}
