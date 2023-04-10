import { Currency } from "@prisma/client";
import { PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getPrisma from "src/utils/prisma/getPrisma";

export default async function getCurrencyInfoForTreasuryMint(
  treasuryMint: PublicKey
): Promise<Maybe<Currency>> {
  const prisma = getPrisma();
  return prisma.currency.findUnique({
    where: { mint: treasuryMint.toString() },
  });
}
