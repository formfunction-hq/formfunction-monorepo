import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import dayjs from "src/utils/dates/dayjsex";
import getNftCreatorFromMint from "src/utils/prisma/getNftCreatorFromMint";
import getSaleTypeFromTradeState from "src/utils/solana/txs/parse/getSaleTypeFromTradeState";
import getSoldTransactionTypeFromSaleType from "src/utils/nft/getSoldTransactionTypeFromSaleType";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import maybeNumber from "formfn-shared/dist/utils/numbers/maybeNumber";
import getSaleTypeForTx from "src/utils/solana/txs/parse/getSaleTypeForTx";
import getCurrencyInfoForAuctionHouse from "src/utils/solana/txs/parse/getCurrencyInfoForAuctionHouse";
import convertPrice from "src/utils/convert/convertPrice";
import { DecodedAuctionHouseTransactionResult } from "@formfunction-hq/formfunction-auction-house";

export default async function parseExecuteSaleTx(
  tx: ParsedTransactionWithMeta,
  decodedTransaction: Maybe<DecodedAuctionHouseTransactionResult>,
  tokenMint?: PublicKey
): Promise<Maybe<{ tx: NftTransactionOnchain }>> {
  if (decodedTransaction == null) {
    return null;
  }

  const decodedInstruction: typeof decodedTransaction.executeSaleV2 =
    // @ts-ignore check for legacy executeSale instruction.
    decodedTransaction?.executeSale ?? decodedTransaction.executeSaleV2;

  if (decodedInstruction == null) {
    return null;
  }

  const { data, accountsMap } = decodedInstruction;
  const {
    auctionHouse,
    buyer,
    buyerTradeState,
    seller,
    tokenMint: tokenMintForIx,
  } = accountsMap;

  if (tokenMint != null && !tokenMint.equals(tokenMintForIx.pubkey)) {
    return null;
  }

  const saleType =
    // seller_trade_state may differ from buyer_trade_state if seller is accepting offer
    getSaleTypeForTx(tx, ["buyer_trade_state"]) ??
    (await getSaleTypeFromTradeState(buyerTradeState.pubkey));

  const currencyInfo = await getCurrencyInfoForAuctionHouse(
    auctionHouse.pubkey
  );

  const price = maybeNumber(data.buyerPrice as string);

  const creator = await getNftCreatorFromMint(tokenMintForIx.pubkey);

  const txid = tx.transaction.signatures[0];
  return {
    tx: {
      creatorId: creator.creatorAddress ?? "",
      fromAddress: seller.pubkey.toString(),
      id: txid,
      mint: tokenMintForIx.pubkey.toString(),
      price: currencyInfo != null ? convertPrice(price, currencyInfo) : null,
      priceInLamports: price,
      timeCreated: dayjs.unix(tx.blockTime!).toDate(),
      toAddress: buyer.pubkey.toString(),
      txid,
      type: getSoldTransactionTypeFromSaleType(saleType),
    },
  };
}
