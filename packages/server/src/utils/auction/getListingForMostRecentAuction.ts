import NftTransactionWithUsers from "src/types/NftTransactionWithUsers";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";

export default function getListingForMostRecentAuction(
  txs: Array<NftTransactionWithUsers>
): Maybe<{ index: number; tx: NftTransactionWithUsers }> {
  const index = txs.findIndex(
    (tx) => tx.type === NftTransactionTypeExpress_Enum.Listed
  );

  if (index === -1) {
    return null;
  }

  return { index, tx: txs[index] };
}
