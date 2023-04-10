import {
  PriceFunctionType,
  AuctionHouseSdk,
} from "@formfunction-hq/formfunction-auction-house";
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import getNftMintTokenAccountAddressOrAta from "utils/solana/tokens/read/getNftMintTokenAccountAddressOrAta";
import { Maybe, Undef } from "formfn-shared/dist/types/UtilityTypes";
import { Dayjs } from "dayjs";

/**
 * If the public sale start time is undefined, but the allowlist is enabled, the
 * public sale start time should be set to 0, which in auction-house will be
 * interpreted to mean there is no public sale (allowlist only).
 */
function getEditionAllowlistPublicSaleStartTime(
  allowlistStartTime: Undef<Dayjs>,
  publicSaleStartTime: Undef<Dayjs>
): Maybe<number> {
  const allowlistEnabled = allowlistStartTime != null;
  return publicSaleStartTime == null && allowlistEnabled
    ? 0
    : publicSaleStartTime?.unix() ?? null;
}

export type GetCreateEditionDistributorTxInput = {
  additionalIxs?: Array<TransactionInstruction>;
  allowlistPriceInFullDecimals: Maybe<number>;
  allowlistStartTime?: Dayjs;
  antiBotProtectionEnabled: boolean;
  auctionHouseSdk: AuctionHouseSdk;
  connection: Connection;
  editionBuyLimitPerAddress: Maybe<number>;
  mint: string;
  priceFunctionType: PriceFunctionType;
  priceParams: Array<number>;
  publicSaleStartTime?: Dayjs;
  startingPriceInFullDecimals: number;
  userId: string;
};

export default async function getCreateEditionDistributorTx({
  additionalIxs,
  allowlistPriceInFullDecimals,
  allowlistStartTime,
  antiBotProtectionEnabled,
  auctionHouseSdk,
  connection,
  editionBuyLimitPerAddress,
  mint,
  priceFunctionType,
  priceParams,
  publicSaleStartTime,
  startingPriceInFullDecimals,
  userId,
}: GetCreateEditionDistributorTxInput): Promise<Transaction> {
  const mintKey = new PublicKey(mint);
  const userKey = new PublicKey(userId);
  const tokenAccount = await getNftMintTokenAccountAddressOrAta(
    connection,
    mintKey,
    userKey
  );
  const tx = await auctionHouseSdk.createEditionDistributorTx(
    {
      mint: mintKey,
      owner: userKey,
      tokenAccount,
    },
    {
      allowlistSalePrice: allowlistPriceInFullDecimals,
      allowlistSaleStartTime: allowlistStartTime?.unix() ?? null,
      antiBotProtectionEnabled,
      limitPerAddress: editionBuyLimitPerAddress,
      priceFunctionType,
      priceParams,
      publicSaleStartTime: getEditionAllowlistPublicSaleStartTime(
        allowlistStartTime,
        publicSaleStartTime
      ),
      saleEndTime: null,
      startingPriceLamports: startingPriceInFullDecimals,
    },
    // Transfer the NFT to the distributor
    true
  );

  if (additionalIxs != null) {
    tx.add(...additionalIxs);
  }

  return tx;
}
