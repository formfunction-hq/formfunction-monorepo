import { ParsedTransactionWithMeta } from "@solana/web3.js";
import { Maybe } from "types/UtilityTypes";
import SortOrder from "types/enums/SortOrder";
import { getCompareByProperty } from "utils/getCompareByProperty";

export default async function findParsedNftTransaction<T>(
  txs: Array<ParsedTransactionWithMeta>,
  parseFn: (tx: ParsedTransactionWithMeta) => Maybe<T>,
  sortOrder: SortOrder = SortOrder.Desc
): Promise<Maybe<T>> {
  const sortedTxs = txs.sort(getCompareByProperty("blockTime", sortOrder));
  const parsedTxs = await Promise.all(sortedTxs.map((tx) => parseFn(tx)));

  const tx = parsedTxs.find((t) => t != null);
  if (tx != null && tx !== "ignore") {
    return tx;
  }

  return null;
}
