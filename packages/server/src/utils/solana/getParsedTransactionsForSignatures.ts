/* eslint-disable no-await-in-loop */
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import ConnectionWrapper from "src/utils/solana/rpc/ConnectionWrapper";
import pLimit from "p-limit";
import batchArray from "formfn-shared/dist/utils/array/batchArray";
import { ParsedTransactionWithMeta } from "@solana/web3.js";

const limit = pLimit(20);

export default async function getParsedTransactionsForSignatures(
  signatures: Array<string>
): Promise<Array<ParsedTransactionWithMeta>> {
  // Load transactions in batches of 1000 to limit the response sizes
  const batchedSigs = batchArray(signatures, 1000);
  const txsBatched = await Promise.all(
    batchedSigs.map((sigs) =>
      limit(async () => {
        const txs = await ConnectionWrapper.getParsedTransactions(
          sigs,
          "confirmed"
        );
        return filterNulls(txs);
      })
    )
  );
  return txsBatched.flat();
}
