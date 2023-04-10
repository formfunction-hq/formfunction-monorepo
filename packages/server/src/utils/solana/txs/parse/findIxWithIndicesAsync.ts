import {
  ParsedInstruction,
  ParsedTransactionWithMeta,
  PartiallyDecodedInstruction,
} from "@solana/web3.js";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import findAsync from "formfn-shared/dist/utils/array/findAsync";
import findIndexAsync from "formfn-shared/dist/utils/array/findIndexAsync";
import getAllInnerIxsWithIndices from "src/utils/solana/getAllInnerIxsWithIndices";

/**
 * Helper function that finds a transaction's instruction (either top-level or inner)
 * based on a predicate function, and returns both the instruction as well as its indices.
 *
 * IMPORTANT: keep in sync with findIxWithIndices
 */
export default async function findIxWithIndicesAsync(
  tx: ParsedTransactionWithMeta,
  isIx: (
    ix: ParsedInstruction | PartiallyDecodedInstruction
  ) => Promise<boolean>
): Promise<
  Maybe<{
    ix: ParsedInstruction | PartiallyDecodedInstruction;
    ixIndex: number;
    ixInnerIndex: MaybeUndef<number>;
  }>
> {
  const ixs = tx.transaction.message.instructions;
  const ixIndex = await findIndexAsync(ixs, (ix) => isIx(ix));

  const allInnerIxs =
    ixIndex !== -1
      ? // Don't bother in this case
        []
      : getAllInnerIxsWithIndices(tx);
  const innerIx = await findAsync(allInnerIxs ?? [], ({ ix }) => isIx(ix));

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
