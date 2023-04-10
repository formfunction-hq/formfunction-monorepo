import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import getNftCreatorFromMint from "src/utils/prisma/getNftCreatorFromMint";
import dayjs from "src/utils/dates/dayjsex";
import {
  NftTransactionTypeExpress_Enum,
  PriceFunctionTypeExpress_Enum,
} from "src/__generated__/generated";
import maybeNumber from "formfn-shared/dist/utils/numbers/maybeNumber";
import getCurrencyInfoForTreasuryMint from "src/utils/solana/txs/parse/getCurrencyInfoForTreasuryMint";
import convertPrice from "src/utils/convert/convertPrice";
import { WRAPPED_SOL_MINT } from "formfn-shared/dist/constants/SolanaConstants";
import {
  DecodedAuctionHouseTransactionResult,
  deserializePriceFunctionType,
} from "@formfunction-hq/formfunction-auction-house";
import convertPriceFunctionTypeToGql from "src/utils/convert/convertPriceFunctionTypeToGql";

// TODO[@]: Remove this "New" function when replacing the old functions, which
// currently both exist as we are testing the new approach.
export default async function parseCreateEditionDistributorTx(
  tx: ParsedTransactionWithMeta,
  decodedTransaction: Maybe<DecodedAuctionHouseTransactionResult>,
  tokenMint?: PublicKey
): Promise<
  Maybe<{
    createEditionDistributorInfo: {
      priceFunctionType: PriceFunctionTypeExpress_Enum;
      priceParams: Array<number>;
      startingPriceLamports: Maybe<number>;
    };
    tx: NftTransactionOnchain;
  }>
> {
  if (
    decodedTransaction == null ||
    decodedTransaction.createEditionDistributor == null
  ) {
    return null;
  }

  const { data, accountsMap } = decodedTransaction.createEditionDistributor;
  const { owner, mint, treasuryMint } = accountsMap;

  const currencyInfo = await getCurrencyInfoForTreasuryMint(
    treasuryMint?.pubkey ?? WRAPPED_SOL_MINT
  );

  if (tokenMint != null && !tokenMint.equals(mint.pubkey)) {
    return null;
  }

  const creatorAndAddress = await getNftCreatorFromMint(mint.pubkey);

  const price = maybeNumber(data.startingPriceLamports as string);

  const txid = tx.transaction.signatures[0];
  return {
    createEditionDistributorInfo: {
      priceFunctionType: convertPriceFunctionTypeToGql(
        deserializePriceFunctionType(data.priceFunctionType)
      ),
      priceParams: data.priceParams as Array<number>,
      startingPriceLamports: price,
    },
    tx: {
      creatorId: creatorAndAddress.creatorAddress ?? owner.pubkey.toString(),
      fromAddress: owner.pubkey.toString(),
      id: txid,
      mint: mint.pubkey.toString(),
      price: currencyInfo != null ? convertPrice(price, currencyInfo) : null,
      priceInLamports: price,
      timeCreated: dayjs.unix(tx.blockTime!).toDate(),
      toAddress: owner.pubkey.toString(),
      txid,
      type: NftTransactionTypeExpress_Enum.ListedEditions,
    },
  };
}
