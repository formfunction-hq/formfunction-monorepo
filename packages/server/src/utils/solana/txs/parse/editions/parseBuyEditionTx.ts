import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import maybeNumber from "formfn-shared/dist/utils/numbers/maybeNumber";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import getNftCreatorFromMint from "src/utils/prisma/getNftCreatorFromMint";
import dayjs from "src/utils/dates/dayjsex";
import { NftTransactionTypeExpress_Enum } from "src/__generated__/generated";
import isBotTaxedTransaction from "formfn-shared/dist/utils/solana/txs/parse/isBotTaxedTransaction";
import getCurrencyInfoForAuctionHouse from "src/utils/solana/txs/parse/getCurrencyInfoForAuctionHouse";
import convertPrice from "src/utils/convert/convertPrice";
import { DecodedAuctionHouseTransactionResult } from "@formfunction-hq/formfunction-auction-house";

// Handles v1 and v2 buy edition transactions.
export default async function parseBuyEditionTx(
  tx: ParsedTransactionWithMeta,
  decodedTransaction: Maybe<DecodedAuctionHouseTransactionResult>,
  // We want these txs to be associated with both the standard and master editions
  standardOrMasterEditionMint?: PublicKey
): Promise<Maybe<{ tx: NftTransactionOnchain }>> {
  if (isBotTaxedTransaction(tx)) {
    return null;
  }

  if (decodedTransaction == null) {
    return null;
  }

  const decodedInstruction: typeof decodedTransaction.buyEditionV2 =
    // @ts-ignore check for legacy buyEdition instruction.
    decodedTransaction?.buyEdition ?? decodedTransaction.buyEditionV2;

  if (decodedInstruction == null) {
    return null;
  }
  const { data, accountsMap } = decodedInstruction;
  const { owner, mint, limitedEditionMint, buyer, auctionHouse } = accountsMap;

  const currencyInfo = await getCurrencyInfoForAuctionHouse(
    auctionHouse.pubkey
  );

  if (
    standardOrMasterEditionMint != null &&
    !standardOrMasterEditionMint.equals(limitedEditionMint.pubkey) &&
    !standardOrMasterEditionMint.equals(mint.pubkey)
  ) {
    return null;
  }

  const creatorAndAddress = await getNftCreatorFromMint(
    limitedEditionMint.pubkey
  );

  const price = maybeNumber(data.priceInLamports as string);

  const txid = tx.transaction.signatures[0];
  return {
    tx: {
      creatorId: creatorAndAddress.creatorAddress ?? owner.pubkey.toString(),
      fromAddress: owner.pubkey.toString(),
      id: txid,
      mint: limitedEditionMint.pubkey.toString(),
      price: currencyInfo != null ? convertPrice(price, currencyInfo) : null,
      priceInLamports: price,
      timeCreated: dayjs.unix(tx.blockTime!).toDate(),
      toAddress: buyer.pubkey.toString(),
      txid,
      type: NftTransactionTypeExpress_Enum.SoldEditionPrimary,
    },
  };
}
