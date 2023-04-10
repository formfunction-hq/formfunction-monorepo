import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { Maybe } from "types/UtilityTypes";
import getAccountFromBuyTxByIndex from "utils/solana/txs/getAccountFromBuyTxByIndex";

const PAYMENT_ACCOUNT_POSITION = 1;

export default async function getPaymentAccountFromBuyTx(
  tx: Maybe<ParsedTransactionWithMeta>,
  programId: PublicKey
) {
  return getAccountFromBuyTxByIndex(tx, programId, PAYMENT_ACCOUNT_POSITION);
}
