import { ParsedInstruction, ParsedTransactionWithMeta } from "@solana/web3.js";

export default function getTransactionParsedInfo(
  tx: ParsedTransactionWithMeta
) {
  return (tx.transaction.message.instructions[0] as ParsedInstruction).parsed
    ?.info;
}
