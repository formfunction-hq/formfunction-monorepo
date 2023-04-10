import {
  ParsedInstruction,
  ParsedTransactionWithMeta,
  PartiallyDecodedInstruction,
} from "@solana/web3.js";

export default function getAllInnerIxsWithIndices(
  parsedTx: ParsedTransactionWithMeta
) {
  return parsedTx.meta?.innerInstructions?.reduce(
    (
      acc: Array<{
        ix: ParsedInstruction | PartiallyDecodedInstruction;
        ixIndex: number;
        ixInnerIndex: number;
      }>,
      currVal
    ) => [
      ...acc,
      ...currVal.instructions.map((ix, ixInnerIndex) => ({
        ix,
        ixIndex: currVal.index,
        ixInnerIndex,
      })),
    ],
    []
  );
}
