/* eslint-disable no-param-reassign */
import { NftTransaction } from "@prisma/client";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";

export default function getOutbidUsers(
  txsInit: Array<NftTransaction>,
  txid: string,
  bidderUserId: string
) {
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
    return [];
  }

  const outbidUsers = [];
  // eslint-disable-next-line no-plusplus
  for (let i = txIdx + 1; i < txs.length; i++) {
    if (
      [
        NftTransactionTypeExpress_Enum.Sold,
        NftTransactionTypeExpress_Enum.Transferred,
      ].includes(txs[i].type as NftTransactionTypeExpress_Enum)
    ) {
      break;
    }

    if (
      (txs[txIdx].price ?? 0) > (txs[i].price ?? 0) &&
      bidderUserId !== txs[i].fromUserId
    ) {
      outbidUsers.push(txs[i].fromUserId);
    }
  }

  return [...new Set(outbidUsers)];
}
