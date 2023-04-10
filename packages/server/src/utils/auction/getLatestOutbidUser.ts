/* eslint-disable no-param-reassign */
import { NftTransaction } from "@prisma/client";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import logError from "src/utils/analytics/logError";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";

export default function getLatestOutbidUser(
  txsInit: Array<NftTransaction>,
  txid: string,
  bidderUserId: string
): Maybe<{ bidPrice: number; userId: string }> {
  const txsFiltered = txsInit.filter((tx) =>
    [
      NftTransactionTypeExpress_Enum.Bid,
      NftTransactionTypeExpress_Enum.Sold,
      NftTransactionTypeExpress_Enum.Transferred,
    ].includes(tx.type as NftTransactionTypeExpress_Enum)
  );
  const txs = txsFiltered.sort(
    getCompareByProperty("timeCreated", SortOrder.Desc)
  );

  const txIdx = txs.findIndex((tx) => tx.txid === txid);

  if (txIdx === -1) {
    return null;
  }

  // eslint-disable-next-line no-plusplus
  for (let i = txIdx + 1; i < txs.length; i++) {
    if (
      [
        NftTransactionTypeExpress_Enum.Sold,
        NftTransactionTypeExpress_Enum.Transferred,
      ].includes(txs[i].type as NftTransactionTypeExpress_Enum)
    ) {
      return null;
    }

    if ((txs[txIdx].price ?? 0) > (txs[i].price ?? 0)) {
      if (bidderUserId === txs[i].fromUserId) {
        // Note: it's possible to outbid yourself
        // Not necessarily an error, but I want to get notified about when this happens
        logError(
          AnalyticsEvent.OutbidYourself,
          `${bidderUserId} outbid themself`,
          null,
          {
            newPrice: txs[txIdx].price ?? 0,
            oldPrice: txs[i].price ?? 0,
            txid,
            txsInit,
          }
        );
      }

      return { bidPrice: Number(txs[i].price ?? 0), userId: txs[i].fromUserId };
    }
  }

  return null;
}
