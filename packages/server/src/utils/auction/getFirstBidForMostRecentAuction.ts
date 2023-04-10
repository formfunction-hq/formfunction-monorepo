import NftTransactionWithUsers from "src/types/NftTransactionWithUsers";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";

/**
 * Assumes txs are sorted descendingly by timeCreated.
 */
export default function getFirstBidForMostRecentAuction(
  txs: Array<NftTransactionWithUsers>
): Maybe<{ index: number; tx: NftTransactionWithUsers }> {
  // Jump to most recent bid
  let firstBidIndex = txs.findIndex(
    (tx) => tx.type === NftTransactionTypeExpress_Enum.Bid
  );

  if (firstBidIndex === -1) {
    return null;
  }

  // eslint-disable-next-line no-plusplus
  for (let i = firstBidIndex + 1; i < txs.length; i++) {
    const tx = txs[i];
    if (tx.type === NftTransactionTypeExpress_Enum.Bid) {
      firstBidIndex = i;
    }

    if (
      [
        NftTransactionTypeExpress_Enum.Minted,
        NftTransactionTypeExpress_Enum.Sold,
        NftTransactionTypeExpress_Enum.Transferred,
      ].includes(tx.type as NftTransactionTypeExpress_Enum)
    ) {
      break;
    }
  }

  return { index: firstBidIndex, tx: txs[firstBidIndex] };
}
