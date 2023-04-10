import { Currency } from "@prisma/client";
import { PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getCurrencyInfoForTreasuryMint from "src/utils/solana/txs/parse/getCurrencyInfoForTreasuryMint";
import getTreasuryMintAccountFromAuctionHouse from "src/utils/solana/txs/parse/getTreasuryMintAccountFromAuctionHouse";

export default async function getCurrencyInfoForAuctionHouse(
  auctionHouse: PublicKey
): Promise<Maybe<Currency>> {
  const treasuryMint = await getTreasuryMintAccountFromAuctionHouse(
    auctionHouse
  );
  return getCurrencyInfoForTreasuryMint(treasuryMint);
}
