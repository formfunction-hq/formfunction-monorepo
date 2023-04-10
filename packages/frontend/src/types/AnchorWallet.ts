import { PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";

interface AnchorWallet {
  publicKey: PublicKey;
  signAllTransactions(
    transactions: Array<Transaction>
  ): Promise<Array<Transaction>>;
  signTransaction(transaction: Transaction): Promise<Transaction>;
  signVersionedTransaction(
    transaction: VersionedTransaction
  ): Promise<VersionedTransaction>;
}

export default AnchorWallet;
