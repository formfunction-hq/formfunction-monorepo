import { Connection, Keypair, Transaction } from "@solana/web3.js";
import AnchorWallet from "types/AnchorWallet";
import combineTransactions from "formfn-shared/dist/utils/solana/txs/combineTransactions";

interface ISendTransactionParams {
  connection: Connection;
  signers?: Array<Keypair>;
  txs: Array<Transaction>;
  wallet: AnchorWallet;
}

export default async function signTransaction({
  connection,
  wallet,
  txs,
  signers = [],
}: ISendTransactionParams): Promise<Transaction> {
  const latestBlockhash = await connection.getLatestBlockhash();
  const tx = combineTransactions(txs, {
    blockhash: latestBlockhash.blockhash,
    feePayer: wallet.publicKey,
    lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
  });

  if (signers.length) {
    tx.partialSign(...signers);
  }

  return wallet.signTransaction(tx);
}
