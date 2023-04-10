import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { Maybe } from "types/UtilityTypes";
import getAccountFromBuyTxByIndex from "utils/solana/txs/getAccountFromBuyTxByIndex";

const TOKEN_ACCOUNT_POSITION = 4;

export default async function getTokenAccountFromBuyTx(
  tx: Maybe<ParsedTransactionWithMeta>,
  programId: PublicKey
) {
  return getAccountFromBuyTxByIndex(tx, programId, TOKEN_ACCOUNT_POSITION);
}
