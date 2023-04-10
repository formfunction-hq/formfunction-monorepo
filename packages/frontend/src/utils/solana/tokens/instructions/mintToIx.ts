import { createMintToInstruction } from "@solana/spl-token";
import { Keypair, PublicKey, TransactionInstruction } from "@solana/web3.js";

export default async function mintToIx(
  mint: PublicKey,
  dest: PublicKey,
  mintAuthority: PublicKey,
  multiSigners: Array<Keypair>,
  amount: number
): Promise<TransactionInstruction> {
  return createMintToInstruction(
    mint,
    dest,
    mintAuthority,
    amount,
    multiSigners
  );
}
