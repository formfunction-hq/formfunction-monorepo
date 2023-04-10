import NftTransactionWithUsers from "src/types/NftTransactionWithUsers";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";

export default function getHighestBidFromTransactions(
  userId: string,
  // Expected to be sorted by timeCreated in descending order
  txs: Array<NftTransactionWithUsers>
): Maybe<number> {
  const mostRecentBid = txs.find(
    (tx) =>
      tx.price != null &&
      tx.type === NftTransactionTypeExpress_Enum.Bid &&
      tx.fromUserId === userId
  );

  return mostRecentBid?.price == null ? null : Number(mostRecentBid.price);
}
