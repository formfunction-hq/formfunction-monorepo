import {
  ParsedInstruction,
  ParsedTransactionWithMeta,
  PartiallyDecodedInstruction,
} from "@solana/web3.js";

/**
 * TODO mlim: should replace usages with getAllInnerIxsWithIndices
 */
export default function getAllInnerIxs(parsedTx: ParsedTransactionWithMeta) {
  return parsedTx.meta?.innerInstructions?.reduce(
    (acc: Array<ParsedInstruction | PartiallyDecodedInstruction>, currVal) => [
      ...acc,
      ...currVal.instructions,
    ],
    []
  );
}
