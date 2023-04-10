import { PublicKey } from "@solana/web3.js";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import getParsedTransactionsForAddress from "src/utils/solana/getParsedTransactionsForAddress";
import parseCancelOfferTx from "src/utils/solana/txs/parse/parseCancelOfferTx";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import { decodeAuctionHouseTransaction } from "@formfunction-hq/formfunction-auction-house";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";

// TODO: try to refactor to re-use logic between this and getMostRecentSetAuthorityTxForMint
export default async function getMostRecentCancelOfferTxForBuyerEscrowAccount(
  buyerEscrowAccount: PublicKey
): Promise<MaybeUndef<NftTransactionOnchain>> {
  const txs = (await getParsedTransactionsForAddress(buyerEscrowAccount))?.sort(
    getCompareByProperty("blockTime", SortOrder.Desc)
  );
  if (txs == null) {
    return null;
  }

  return txs
    .map((tx) => {
      const decodedTransaction = decodeAuctionHouseTransaction(
        getAuctionHouseConstants().programId,
        tx
      );
      return parseCancelOfferTx(tx, decodedTransaction);
    })
    .find((item) => item != null);
}
