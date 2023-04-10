import { Transaction, TransactionInstruction } from "@solana/web3.js";

export default function ixsToTx(ixs: Array<TransactionInstruction>) {
  const tx = new Transaction();
  tx.add(...ixs);
  return tx;
}
