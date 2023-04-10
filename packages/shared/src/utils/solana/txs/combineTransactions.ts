import { Transaction, TransactionBlockhashCtor } from "@solana/web3.js";

export default function combineTransactions(
  transactions: Array<Transaction>,
  options?: TransactionBlockhashCtor
) {
  if (transactions.length === 1) {
    return transactions[0];
  }

  // TODO: make this work for pre-signed transactions by calling
  // `addSignature` for each signature
  const combinedTransaction = new Transaction(options);
  transactions.forEach((transaction) =>
    transaction.instructions.forEach((instruction) => {
      combinedTransaction.add(instruction);
    })
  );
  return combinedTransaction;
}
