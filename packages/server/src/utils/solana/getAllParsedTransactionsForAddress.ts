/* eslint-disable no-await-in-loop */
import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import {
  CONFIRMED_SIGNATURES_LIMIT,
  MAX_ITERS,
} from "src/utils/solana/getConfirmedSignaturesForAddress";
import getParsedTransactionsForAddress from "src/utils/solana/getParsedTransactionsForAddress";

export default async function getAllParsedTransactionsForAddress(
  address: PublicKey,
  excludeFailures = true
): Promise<Array<ParsedTransactionWithMeta>> {
  // Assumes there are less than or equal to MAX_ITERS * CONFIRMED_SIGNATURES_LIMIT total transactions
  return getParsedTransactionsForAddress(
    address,
    MAX_ITERS * CONFIRMED_SIGNATURES_LIMIT,
    excludeFailures
  );
}
