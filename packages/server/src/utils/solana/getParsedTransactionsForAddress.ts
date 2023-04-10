import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import getConfirmedSignaturesForAddress from "src/utils/solana/getConfirmedSignaturesForAddress";
import getParsedTransactionsForSignatures from "src/utils/solana/getParsedTransactionsForSignatures";

export default async function getParsedTransactionsForAddress(
  address: PublicKey,
  limit = 1000,
  excludeFailures = true
): Promise<Array<ParsedTransactionWithMeta>> {
  const signatures = await getConfirmedSignaturesForAddress(
    address,
    limit,
    excludeFailures
  );
  return getParsedTransactionsForSignatures(signatures);
}
