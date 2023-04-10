import { Transaction, TransactionInstruction } from "@solana/web3.js";

export default function ixToTx(ix: TransactionInstruction) {
  const tx = new Transaction();
  tx.add(ix);
  return tx;
}
