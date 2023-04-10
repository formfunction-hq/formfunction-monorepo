import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import createAtaIx from "utils/solana/instructions/createAtaIx";

export default async function getCreateAtaTx(
  mint: PublicKey,
  owner: PublicKey,
  payer: Keypair
): Promise<Transaction> {
  const instruction = await createAtaIx(mint, owner, payer.publicKey);
  const transaction = new Transaction();
  transaction.add(instruction);

  return transaction;
}
