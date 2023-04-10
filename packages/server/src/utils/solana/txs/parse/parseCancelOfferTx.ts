import { ParsedTransactionWithMeta } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import dayjs from "src/utils/dates/dayjsex";
import getNftCreatorFromMint from "src/utils/prisma/getNftCreatorFromMint";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import getTokenAccountInfo from "src/utils/solana/getTokenAccountInfo";
import getCurrencyInfoForAuctionHouse from "src/utils/solana/txs/parse/getCurrencyInfoForAuctionHouse";
import convertPrice from "src/utils/convert/convertPrice";
import { DecodedAuctionHouseTransactionResult } from "@formfunction-hq/formfunction-auction-house";

export default async function parseCancelOfferTx(
  tx: ParsedTransactionWithMeta,
  decodedTransaction: Maybe<DecodedAuctionHouseTransactionResult>
): Promise<Maybe<NftTransactionOnchain>> {
  const ixs = tx.transaction.message.instructions;
  if (ixs.length !== 2) {
    // Cancel offer txs are always cancel + withdraw
    // TODO: check against program logs once we implement
    return null;
  }

  if (decodedTransaction == null) {
    return null;
  }

  // @ts-ignore check for legacy Cancel instruction.
  const maybeCancelV1 = decodedTransaction?.cancel;

  const cancelIx: typeof decodedTransaction.cancelV2 =
    maybeCancelV1 != null ? maybeCancelV1 : decodedTransaction.cancelV2;

  const withdrawIx = decodedTransaction.withdraw;

  // If either one is not present, not a cancel offer tx.
  if (cancelIx == null || withdrawIx == null) {
    return null;
  }

  const {
    wallet: buyer,
    tokenAccount,
    tokenMint,
    auctionHouse,
  } = cancelIx.accountsMap;

  const currencyInfo = await getCurrencyInfoForAuctionHouse(
    auctionHouse.pubkey
  );

  const [tokenAccountInfo, creator] = await Promise.all([
    getTokenAccountInfo(tokenAccount.pubkey),
    getNftCreatorFromMint(tokenMint.pubkey),
  ]);
  const seller = tokenAccountInfo!.owner;

  const price = Number(withdrawIx.data.amount);

  const txid = tx.transaction.signatures[0];
  return {
    creatorId: creator.creatorAddress ?? "",
    fromAddress: buyer.pubkey.toString(),
    id: txid,
    mint: tokenMint.pubkey.toString(),
    price: currencyInfo != null ? convertPrice(price, currencyInfo) : null,
    priceInLamports: price,
    timeCreated: dayjs.unix(tx.blockTime!).toDate(),
    toAddress: seller.toString(),
    txid,
    type: NftTransactionTypeExpress_Enum.OfferCancelled,
  };
}
