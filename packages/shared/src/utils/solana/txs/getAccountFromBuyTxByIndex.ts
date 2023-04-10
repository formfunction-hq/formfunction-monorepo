import {
  ParsedTransactionWithMeta,
  PartiallyDecodedInstruction,
  PublicKey,
} from "@solana/web3.js";
import { Maybe } from "types/UtilityTypes";
import emptyFunction from "utils/emptyFunction";
import isBuyIx from "utils/solana/txs/parse/isBuyIx";

export default async function getAccountFromBuyTxByIndex(
  tx: Maybe<ParsedTransactionWithMeta>,
  programId: PublicKey,
  index: number
) {
  if (tx == null) {
    return null;
  }

  const ixs = tx.transaction.message.instructions;
  const ix = ixs.find(
    (ixInner) => isBuyIx(ixInner, programId, emptyFunction).isIx
  );

  if (ix == null) {
    return null;
  }

  // Token account that was used to make offer
  return (ix as PartiallyDecodedInstruction).accounts[index];
}
