import { Connection, Transaction } from "@solana/web3.js";

export default async function addLatestValidBlockheightToTx(
  connection: Connection,
  transaction: Transaction
): Promise<Transaction> {
  const tx = transaction;
  const latestBlockhash = await connection.getLatestBlockhash();
  tx.recentBlockhash = latestBlockhash.blockhash;
  tx.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
  return tx;
}
