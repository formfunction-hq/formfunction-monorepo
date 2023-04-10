import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import dayjs from "src/utils/dates/dayjsex";
import getNftCreatorFromMint from "src/utils/prisma/getNftCreatorFromMint";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import getTokenAccountOwner from "src/utils/solana/accounts/getTokenAccountOwner";
import SaleType from "@formfunction-hq/formfunction-auction-house/dist/types/enum/SaleType";
import getSaleTypeFromTradeState from "src/utils/solana/txs/parse/getSaleTypeFromTradeState";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import maybeNumber from "formfn-shared/dist/utils/numbers/maybeNumber";
import getSaleTypeForTx from "src/utils/solana/txs/parse/getSaleTypeForTx";
import getCurrencyInfoForAuctionHouse from "src/utils/solana/txs/parse/getCurrencyInfoForAuctionHouse";
import convertPrice from "src/utils/convert/convertPrice";
import { DecodedAuctionHouseTransactionResult } from "@formfunction-hq/formfunction-auction-house";

function getTransactionTypeForSaleType(saleType: SaleType) {
  switch (saleType) {
    case SaleType.Auction:
      return NftTransactionTypeExpress_Enum.Bid;
    case SaleType.Offer:
      return NftTransactionTypeExpress_Enum.Offer;
    case SaleType.InstantSale:
      return null;
    default:
      return assertUnreachable(saleType);
  }
}

export default async function parseBuyTx(
  tx: ParsedTransactionWithMeta,
  decodedTransaction: Maybe<DecodedAuctionHouseTransactionResult>,
  tokenMint?: PublicKey
): Promise<Maybe<{ tx: NftTransactionOnchain }>> {
  if (decodedTransaction == null) {
    return null;
  }

  const decodedInstruction: typeof decodedTransaction.buyV2 =
    // @ts-ignore check for legacy buy instruction.
    decodedTransaction?.buy ?? decodedTransaction.buyV2;

  if (decodedInstruction == null) {
    return null;
  }

  const { data, accountsMap } = decodedInstruction;
  const {
    buyerTradeState,
    wallet: bidder,
    tokenAccount: tokenAccountForIx,
    tokenMint: tokenMintForIx,
    auctionHouse,
  } = accountsMap;

  const saleType =
    getSaleTypeForTx(tx) ??
    (await getSaleTypeFromTradeState(buyerTradeState.pubkey));
  const txType = getTransactionTypeForSaleType(saleType);
  if (txType == null) {
    return null;
  }

  const currencyInfo = await getCurrencyInfoForAuctionHouse(
    auctionHouse.pubkey
  );

  if (tokenMint != null && !tokenMint.equals(tokenMintForIx.pubkey)) {
    return null;
  }

  const [creatorAndAddress, tokenAccountOwner] = await Promise.all([
    getNftCreatorFromMint(tokenMintForIx.pubkey),
    getTokenAccountOwner(new PublicKey(tokenAccountForIx.pubkey)),
  ]);

  if (tokenAccountOwner == null) {
    logError(
      AnalyticsEvent.ParseBuyTxError,
      `Token account owner is null for ${tokenAccountForIx.pubkey.toString()}`,
      null,
      {
        tokenAccountForIx: tokenAccountForIx.pubkey.toString(),
        tokenMint: tokenMint?.toString(),
        tx,
      }
    );
    return null;
  }

  const price = maybeNumber(data.buyerPrice as string);

  const txid = tx.transaction.signatures[0];
  return {
    tx: {
      creatorId: creatorAndAddress.creatorAddress ?? "",
      fromAddress: bidder.pubkey.toString(),
      id: txid,
      mint: tokenMintForIx.pubkey.toString(),
      price:
        price != null && currencyInfo != null
          ? convertPrice(price, currencyInfo)
          : null,
      priceInLamports: price,
      timeCreated: dayjs.unix(tx.blockTime!).toDate(),
      toAddress: tokenAccountOwner,
      txid,
      type: txType,
    },
  };
}
