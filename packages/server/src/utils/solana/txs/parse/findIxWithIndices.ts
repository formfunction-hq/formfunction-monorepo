import {
  ParsedInstruction,
  ParsedTransactionWithMeta,
  PartiallyDecodedInstruction,
} from "@solana/web3.js";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import getAllInnerIxsWithIndices from "src/utils/solana/getAllInnerIxsWithIndices";

/**
 * Helper function that finds a transaction's instruction (either top-level or inner)
 * based on a predicate function, and returns both the instruction as well as its indices.
 *
 * IMPORTANT: keep in sync with findIxWithIndicesAsync
 */
export default function findIxWithIndices(
  tx: ParsedTransactionWithMeta,
  isIx: (ix: ParsedInstruction | PartiallyDecodedInstruction) => boolean
): Maybe<{
  ix: ParsedInstruction | PartiallyDecodedInstruction;
  ixIndex: number;
  ixInnerIndex: MaybeUndef<number>;
}> {
  const ixs = tx.transaction.message.instructions;
  const ixIndex = ixs.findIndex((ix) => isIx(ix));

  const allInnerIxs =
    ixIndex !== -1
      ? // Don't bother in this case
        []
      : getAllInnerIxsWithIndices(tx);
  const innerIx = (allInnerIxs ?? []).find(({ ix }) => isIx(ix));

  if (ixIndex === -1 && innerIx == null) {
    return null;
  }

  const ix = ixIndex !== -1 ? ixs[ixIndex] : innerIx!.ix;
  return {
    ix,
    ixIndex: ixIndex !== -1 ? ixIndex : innerIx!.ixIndex,
    ixInnerIndex: innerIx?.ixInnerIndex,
  };
}
