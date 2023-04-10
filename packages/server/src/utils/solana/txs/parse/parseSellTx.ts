import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import dayjs from "src/utils/dates/dayjsex";
import getNftCreatorFromMint from "src/utils/prisma/getNftCreatorFromMint";
import getSaleTypeFromTradeState from "src/utils/solana/txs/parse/getSaleTypeFromTradeState";
import getListingTransactionTypeFromSaleType from "src/utils/nft/getListingTransactionTypeFromSaleType";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import maybeNumber from "formfn-shared/dist/utils/numbers/maybeNumber";
import getSaleTypeForTx from "src/utils/solana/txs/parse/getSaleTypeForTx";
import getCurrencyInfoForAuctionHouse from "src/utils/solana/txs/parse/getCurrencyInfoForAuctionHouse";
import convertPrice from "src/utils/convert/convertPrice";
import { DecodedAuctionHouseTransactionResult } from "@formfunction-hq/formfunction-auction-house";

export default async function parseSellTx(
  tx: ParsedTransactionWithMeta,
  decodedTransaction: Maybe<DecodedAuctionHouseTransactionResult>,
  tokenMint?: PublicKey
): Promise<Maybe<{ tx: NftTransactionOnchain }>> {
  if (decodedTransaction == null || decodedTransaction.sell == null) {
    return null;
  }
  const { data, accountsMap } = decodedTransaction.sell;
  const {
    tokenMint: tokenMintForIx,
    wallet: lister,
    auctionHouse,
    sellerTradeState,
  } = accountsMap;

  if (tokenMint != null && !tokenMint.equals(tokenMintForIx.pubkey)) {
    return null;
  }

  const currencyInfo = await getCurrencyInfoForAuctionHouse(
    auctionHouse.pubkey
  );

  const saleType =
    getSaleTypeForTx(tx) ??
    (await getSaleTypeFromTradeState(sellerTradeState.pubkey));

  const creator = await getNftCreatorFromMint(tokenMintForIx.pubkey);

  const price = maybeNumber(data.buyerPrice as string);

  const txid = tx.transaction.signatures[0];
  return {
    tx: {
      creatorId: creator.creatorAddress ?? "",
      fromAddress: lister.pubkey.toString(),
      id: txid,
      mint: tokenMintForIx.pubkey.toString(),
      price: currencyInfo != null ? convertPrice(price, currencyInfo) : null,
      priceInLamports: price,
      timeCreated: dayjs.unix(tx.blockTime!).toDate(),
      toAddress: lister.pubkey.toString(),
      txid,
      type: getListingTransactionTypeFromSaleType(saleType),
    },
  };
}
