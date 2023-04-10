import NftTransactionWithUsers from "src/types/NftTransactionWithUsers";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import getWinningBidForMostRecentAuction from "src/utils/auction/getWinningBidForMostRecentAuction";
import hasAuctionEndedForNft from "src/utils/dates/hasAuctionEndedForNft";
import {
  NftExpress,
  NftTransactionTypeExpress_Enum,
  OpenBidStatus,
} from "src/__generated__/generated";

export default function getOpenBidStatusFromTransactions(
  userId: string,
  // Expected to be sorted by timeCreated in descending order
  txs: Array<NftTransactionWithUsers>,
  nft: NftExpress
): Maybe<OpenBidStatus> {
  if (userId === "") {
    return null;
  }

  const winningBid = getWinningBidForMostRecentAuction(txs);
  const userMostRecentBidIndex = txs.findIndex(
    (tx) =>
      tx.type === NftTransactionTypeExpress_Enum.Bid && tx.fromUserId === userId
  );
  if (userMostRecentBidIndex === -1) {
    return null;
  }
  const userMostRecentBid = txs[userMostRecentBidIndex];
  const hasEnded = hasAuctionEndedForNft(nft.status, nft.auctionEndTime);

  if (hasEnded) {
    return userMostRecentBid.txid === winningBid?.tx.txid
      ? OpenBidStatus.Won
      : OpenBidStatus.Refund;
  }

  let status = OpenBidStatus.HighestBid;

  // eslint-disable-next-line no-plusplus
  for (let i = userMostRecentBidIndex - 1; i >= 0; i--) {
    const tx = txs[i];

    if (
      [
        NftTransactionTypeExpress_Enum.Transferred,
        NftTransactionTypeExpress_Enum.Sold,
      ].includes(tx.type as NftTransactionTypeExpress_Enum)
    ) {
      break;
    }

    if (
      tx.type === NftTransactionTypeExpress_Enum.Bid &&
      Number(tx.price!) > Number(userMostRecentBid.price!)
    ) {
      status = OpenBidStatus.Outbid;
      break;
    }
  }

  return status;
}
