import { ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import NftTransactionOnchain from "src/types/NftTransactionOnchain";
import getNftCreatorFromMint from "src/utils/prisma/getNftCreatorFromMint";
import dayjs from "src/utils/dates/dayjsex";
import {
  NftTransactionTypeExpress_Enum,
  PriceFunctionTypeExpress_Enum,
} from "src/__generated__/generated";
import convertPriceFunctionTypeToGql from "src/utils/convert/convertPriceFunctionTypeToGql";
import {
  DecodedAuctionHouseTransactionResult,
  deserializePriceFunctionType,
} from "@formfunction-hq/formfunction-auction-house";
import maybeNumber from "formfn-shared/dist/utils/numbers/maybeNumber";
import getCurrencyInfoForTreasuryMint from "src/utils/solana/txs/parse/getCurrencyInfoForTreasuryMint";
import { WRAPPED_SOL_MINT } from "formfn-shared/dist/constants/SolanaConstants";
import convertPrice from "src/utils/convert/convertPrice";

type UpdateEditionDistributorInfo = {
  endTime: Maybe<number>;
  newOwner: Maybe<string>;
  priceFunctionType: PriceFunctionTypeExpress_Enum;
  priceParams: Array<number>;
  startTime: Maybe<number>;
  startingPriceLamports: Maybe<number>;
};

export default async function parseUpdateEditionDistributorTx(
  tx: ParsedTransactionWithMeta,
  decodedTransaction: Maybe<DecodedAuctionHouseTransactionResult>,
  tokenMint?: PublicKey
): Promise<
  Maybe<{
    tx: NftTransactionOnchain;
    updateEditionDistributorInfo: UpdateEditionDistributorInfo;
  }>
> {
  if (
    decodedTransaction == null ||
    decodedTransaction.updateEditionDistributor == null
  ) {
    return null;
  }
  const { data, accountsMap } = decodedTransaction.updateEditionDistributor;
  const { owner, mint, treasuryMint } = accountsMap;

  const currencyInfo = await getCurrencyInfoForTreasuryMint(
    treasuryMint?.pubkey ?? WRAPPED_SOL_MINT
  );

  if (tokenMint != null && !tokenMint.equals(mint.pubkey)) {
    return null;
  }

  const creatorAndAddress = await getNftCreatorFromMint(mint.pubkey);

  const startingPriceInFullDecimals = maybeNumber(
    data.startingPriceLamports as string
  );

  const txid = tx.transaction.signatures[0];
  return {
    tx: {
      creatorId: creatorAndAddress.creatorAddress ?? owner.pubkey.toString(),
      fromAddress: owner.pubkey.toString(),
      id: txid,
      mint: mint.pubkey.toString(),
      price:
        currencyInfo != null
          ? convertPrice(startingPriceInFullDecimals, currencyInfo)
          : null,
      priceInLamports: startingPriceInFullDecimals,
      timeCreated: dayjs.unix(tx.blockTime!).toDate(),
      toAddress: owner.pubkey.toString(),
      txid,
      type: NftTransactionTypeExpress_Enum.ChangePriceForEditions,
    },
    updateEditionDistributorInfo: {
      endTime: data.endTime as number,
      newOwner: data.newOwner?.toString() ?? null,
      priceFunctionType: convertPriceFunctionTypeToGql(
        deserializePriceFunctionType(data.priceFunctionType)
      ),
      priceParams: data.priceParams as Array<number>,
      startTime: data.startTime as number,
      startingPriceLamports: startingPriceInFullDecimals,
    },
  };
}
