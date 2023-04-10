/* eslint-disable no-constant-condition */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable for-direction */
import {
  NftTransactionExpress,
  NftTransactionTypeExpress_Enum,
} from "src/__generated__/generated";
import dayjs from "src/utils/dates/dayjsex";
import { nanoid } from "nanoid";
import Typename from "src/types/enums/Typename";
import didExtendAuction from "src/utils/dates/didExtendAuction";
import { Duration } from "dayjs/plugin/duration";
import AUCTION_END_BUFFER from "src/constants/AuctionEndBuffer";
import logEvent from "src/utils/analytics/logEvent";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import toObject from "formfn-shared/dist/utils/toObject";
import getNftTransactionNftInfo from "src/utils/graphql/getNftTransactionNftInfo";

const ITEM_AVAILABLE_TYPES = [
  NftTransactionTypeExpress_Enum.Transferred,
  NftTransactionTypeExpress_Enum.Minted,
  NftTransactionTypeExpress_Enum.Sold,
];

function getAuctionWonTime(
  firstBidTx: NftTransactionExpress,
  penultimateBidTx: NftTransactionExpress,
  lastBidTx: NftTransactionExpress,
  auctionDuration: Duration,
  timeExtensionDuration: Duration
) {
  const endOfAuctionNoExt = dayjs(firstBidTx.timeCreated).add(auctionDuration);
  // No time extensions
  if (
    !didExtendAuction(
      endOfAuctionNoExt,
      dayjs(lastBidTx.timeCreated),
      dayjs(penultimateBidTx.timeCreated),
      timeExtensionDuration
    )
  ) {
    return endOfAuctionNoExt;
  }

  return dayjs(lastBidTx.timeCreated).add(timeExtensionDuration);
}

/**
 * TODO: delete this, it's unused
 *
 * Assuming these params:
 * - Auction duration: 30
 * - Time extension duration: 10
 *
 * LEGEND
 * - * is a bid
 * - | just marks a time
 *
 * ------------------------------------------------------------
 *    *                      *    *   |   *    |    |      |
 *  -30                     -5   -2   0   2    5    8     12
 *
 *    |-----> auction start                                |-----> over
 */
function isTimeExtensionActive(
  firstBidTx: NftTransactionExpress,
  penultimateBidTx: NftTransactionExpress,
  lastBidTx: NftTransactionExpress,
  auctionDuration: Duration,
  timeExtensionDuration: Duration,
  auctionEndBuffer: Duration
) {
  const endOfAuctionNoExt = dayjs(firstBidTx.timeCreated).add(auctionDuration);
  // No time extensions
  if (
    !didExtendAuction(
      endOfAuctionNoExt,
      dayjs(lastBidTx.timeCreated),
      dayjs(penultimateBidTx.timeCreated),
      timeExtensionDuration
    )
  ) {
    return false;
  }

  // By now, we know lastBidTx extended the auction. So we just have to check
  // if that extension is still active.
  return dayjs().isBefore(
    dayjs(lastBidTx.timeCreated)
      .add(timeExtensionDuration)
      .add(auctionEndBuffer)
  );
}

export default function insertAuctionWonTxs(
  txsOriginal: Array<NftTransactionExpress>,
  auctionDuration: Duration,
  timeExtensionDuration: Duration,
  auctionEndBuffer = AUCTION_END_BUFFER
): Array<NftTransactionExpress> {
  // Don't modify passed-in array
  const txs = [...txsOriginal];
  const lastBidIndices: Array<number> = [];
  const txsToSplice: Array<NftTransactionExpress> = [];

  let itemAvailableIndex = -1;
  let iter = 0;

  while (true) {
    if (iter > 10) {
      logEvent(AnalyticsEvent.DebugInsertAuctionWonTxs, null, {
        iter,
        txsOriginal: toObject(txsOriginal),
      });
    }
    if (iter > 30) {
      // Prevent infinite loops
      return txs;
    }

    iter++;
    const prevItemAvailableIndex = itemAvailableIndex;
    // Go to most recent Sold/Transferred/Mint tx
    itemAvailableIndex = txs.findIndex(
      (tx, index) =>
        ITEM_AVAILABLE_TYPES.includes(tx.type) && index > prevItemAvailableIndex
    );

    if (itemAvailableIndex === -1) {
      break;
    }

    if (
      prevItemAvailableIndex !== -1 &&
      txs[prevItemAvailableIndex].type ===
        NftTransactionTypeExpress_Enum.Transferred
    ) {
      // In this case, no one won the auction, because the NFT was transferred (e.g. via Phantom)
      continue;
    }

    let firstBidIndex = -1;

    // Find first bid after that tx
    for (let i = itemAvailableIndex - 1; i >= 0; i--) {
      if (txs[i].type === NftTransactionTypeExpress_Enum.Bid) {
        firstBidIndex = i;
        break;
      }
    }

    if (firstBidIndex === -1) {
      continue;
    }

    // Find last bid for auction
    let lastBidIndex = firstBidIndex;
    let penultimateBidIndex = firstBidIndex;
    for (let i = firstBidIndex - 1; i >= 0; i--) {
      const tx = txs[i];
      if (ITEM_AVAILABLE_TYPES.includes(tx.type)) {
        break;
      }

      if (tx.type === NftTransactionTypeExpress_Enum.Bid) {
        penultimateBidIndex = lastBidIndex;
        lastBidIndex = i;
      }
    }

    const firstBidTx = txs[firstBidIndex];
    const lastBidTx = txs[lastBidIndex];
    const penultimateBidTx = txs[penultimateBidIndex];
    if (
      dayjs().diff(dayjs(firstBidTx.timeCreated), "seconds", true) <
      auctionDuration.add(auctionEndBuffer).asSeconds()
    ) {
      // Auction has not finished yet
      continue;
    }

    if (
      isTimeExtensionActive(
        firstBidTx,
        penultimateBidTx,
        lastBidTx,
        auctionDuration,
        timeExtensionDuration,
        auctionEndBuffer
      )
    ) {
      // Auction has not finished yet, b/c of time extension
      continue;
    }

    if (lastBidTx.source != null) {
      // Don't insert "auction won" txs for imported txs
      continue;
    }

    lastBidIndices.push(lastBidIndex);

    const auctionWonTx = {
      Creator: lastBidTx.Creator,
      From: lastBidTx.To,
      To: lastBidTx.From,
      __typename: Typename.NftTransaction as Typename.NftTransaction,
      auctionCount: lastBidTx.auctionCount,
      creatorId: lastBidTx.creatorId,
      fromAddress: lastBidTx.toAddress,
      id: nanoid(),
      mint: lastBidTx.mint,
      nftInfo: getNftTransactionNftInfo(null),
      priceInLamports: lastBidTx.priceInLamports,
      timeCreated: getAuctionWonTime(
        firstBidTx,
        penultimateBidTx,
        lastBidTx,
        auctionDuration,
        timeExtensionDuration
      ).toDate(),
      toAddress: lastBidTx.fromAddress,
      type: NftTransactionTypeExpress_Enum.AuctionWon,
    };

    txsToSplice.push(auctionWonTx);
  }

  for (let i = 0; i < lastBidIndices.length; i++) {
    txs.splice(lastBidIndices[i] + i, 0, txsToSplice[i]);
  }

  return txs;
}
