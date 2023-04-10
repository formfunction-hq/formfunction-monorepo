import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import parseNftTx from "src/utils/solana/txs/parse/parseNftTx";

export default async function findNftTxs(
  txs: Array<Maybe<ParsedTransactionWithMeta>>,
  tokenMint: PublicKey
) {
  const parsedTxs = await Promise.all(
    txs.map(async (tx) => parseNftTx(tx, tokenMint))
  );

  return filterNulls(parsedTxs);
}
