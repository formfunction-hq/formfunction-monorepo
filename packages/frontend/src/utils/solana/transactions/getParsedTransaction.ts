import { Connection, ParsedTransactionWithMeta } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

export default function getParsedTransaction(
  connection: Connection,
  txid: string
): Promise<Maybe<ParsedTransactionWithMeta>> {
  return connection.getParsedTransaction(txid, {
    commitment: "confirmed",
    maxSupportedTransactionVersion: 0,
  });
}
