import { createAssociatedTokenAccountInstruction } from "@solana/spl-token";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import findAta from "utils/solana/pdas/findAta";

export default async function createAtaIx(
  mint: PublicKey,
  owner: PublicKey,
  payer: PublicKey
): Promise<TransactionInstruction> {
  const [ata] = await findAta(owner, mint);
  return createAssociatedTokenAccountInstruction(payer, ata, owner, mint);
}
