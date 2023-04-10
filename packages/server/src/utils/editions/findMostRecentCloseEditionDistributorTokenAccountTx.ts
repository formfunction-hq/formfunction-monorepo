import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import getAllParsedTransactionsForAddress from "src/utils/solana/getAllParsedTransactionsForAddress";
import parseCloseEditionDistributorTokenAccountTx from "src/utils/solana/txs/parse/editions/parseCloseEditionDistributorTokenAccountTx";
import findParsedNftTransaction from "formfn-shared/dist/utils/solana/txs/findParsedNftTransaction";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import { decodeAuctionHouseTransaction } from "@formfunction-hq/formfunction-auction-house";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";

// Finds and returns most recent CloseEditionDistributorTokenAccount tx, if it exists
export default async function findMostRecentCloseEditionDistributorTokenAccountTx(
  masterEditionMint: PublicKey
): Promise<Maybe<NftTransactionOnchain>> {
  const txs = await getAllParsedTransactionsForAddress(masterEditionMint);
  const parsed = await findParsedNftTransaction(
    txs,
    (t: ParsedTransactionWithMeta) => {
      const decodedTransaction = decodeAuctionHouseTransaction(
        getAuctionHouseConstants().programId,
        t
      );
      return parseCloseEditionDistributorTokenAccountTx(
        t,
        decodedTransaction,
        undefined,
        false
      );
    },
    SortOrder.Desc
  );
  if (parsed != null && parsed !== "ignore") {
    return parsed.tx;
  }

  return null;
}
