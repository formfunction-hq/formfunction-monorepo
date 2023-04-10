import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import getAllParsedTransactionsForAddress from "src/utils/solana/getAllParsedTransactionsForAddress";
import { getCompareByProperty } from "formfn-shared/dist/utils/getCompareByProperty";
import SortOrder from "formfn-shared/dist/types/enums/SortOrder";
import parseCreateMintTx from "src/utils/solana/txs/parse/parseCreateMintTx";
import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import insertNftFromMintTransaction from "src/utils/transaction/insertNftFromMintTransaction";

async function findMintedTx(txs: Array<ParsedTransactionWithMeta>) {
  const parsedTxs = await Promise.all(txs.map((tx) => parseCreateMintTx(tx)));
  return parsedTxs.find((tx) => tx != null);
}

/**
 * Try to find "Minted" tx and insert the NFT based on the mint
 */
export default async function insertNftFromMint(
  mint: PublicKey,
  seriesMint?: string
): Promise<Maybe<ConvertNftToMetadataAccountType>> {
  const parsedTxs = await getAllParsedTransactionsForAddress(mint);
  const sortedParsedTxs = parsedTxs.sort(
    getCompareByProperty("blockTime", SortOrder.Asc)
  );
  const mintedTx = await findMintedTx(sortedParsedTxs);
  if (mintedTx == null) {
    return null;
  }

  return insertNftFromMintTransaction(mintedTx, seriesMint);
}
