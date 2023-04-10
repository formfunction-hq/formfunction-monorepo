import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import getFirstBidForMostRecentAuction from "src/utils/auction/getFirstBidForMostRecentAuction";
import NftTransactionWithUsers from "src/types/NftTransactionWithUsers";

/**
 * Assumes txs are sorted descendingly by timeCreated.
 */
export default function getWinningBidForMostRecentAuction(
  txs: Array<NftTransactionWithUsers>
): Maybe<{ index: number; tx: NftTransactionWithUsers }> {
  const firstBid = getFirstBidForMostRecentAuction(txs);

  if (firstBid == null) {
    return null;
  }

  let winningBidIndex = firstBid.index;
  // eslint-disable-next-line no-plusplus
  for (let i = firstBid.index - 1; i >= 0; i--) {
    const tx = txs[i];
    if (
      [
        NftTransactionTypeExpress_Enum.Minted,
        NftTransactionTypeExpress_Enum.Sold,
        NftTransactionTypeExpress_Enum.Transferred,
      ].includes(tx.type as NftTransactionTypeExpress_Enum)
    ) {
      break;
    }

    if (tx.type === NftTransactionTypeExpress_Enum.Bid) {
      winningBidIndex = i;
    }
  }

  return { index: winningBidIndex, tx: txs[winningBidIndex] };
}
