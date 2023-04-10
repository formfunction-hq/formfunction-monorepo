import { Connection, TransactionInstruction } from "@solana/web3.js";
import { NftMetadataV1Input } from "hooks/__generated__/useUploadNftToArweaveMutation.graphql";
import AnchorWallet from "types/AnchorWallet";
import getMintMasterEditionTx from "formfn-shared/dist/utils/solana/metaplex/getMintMasterEditionTx";
import sendMintMasterEditionTx from "utils/solana/metaplex/sendMintMasterEditionTx";
import combineTransactions from "formfn-shared/dist/utils/solana/txs/combineTransactions";
import {
  AuctionHouseSdk,
  PriceFunctionType,
} from "@formfunction-hq/formfunction-auction-house";
import getCreateEditionDistributorTx from "utils/editions/getCreateEditionDistributorTx";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";

type Args = {
  additionalIxs?: Array<TransactionInstruction>;
  auctionHouseSdk: AuctionHouseSdk;
  connection: Connection;
  maxSupply: Maybe<number>;
  metadata: NftMetadataV1Input;
  metadataArweaveLink: string;
  rawTxExtraData?: { [key: string]: any };
  wallet: AnchorWallet;
};

export default async function mintMasterEditionAndCreateEditionDistributor({
  additionalIxs,
  auctionHouseSdk,
  connection,
  maxSupply,
  metadata,
  metadataArweaveLink,
  rawTxExtraData,
  wallet,
}: Args) {
  const {
    transaction: mintMasterEditionTx,
    mintAccount,
    metadataPda,
  } = await getMintMasterEditionTx(
    auctionHouseSdk,
    connection,
    wallet.publicKey,
    metadata,
    maxSupply,
    metadataArweaveLink,
    false
  );

  const createEditionDistributorTx = await getCreateEditionDistributorTx({
    additionalIxs,
    allowlistPriceInFullDecimals: null,
    antiBotProtectionEnabled: false,
    auctionHouseSdk,
    connection,
    editionBuyLimitPerAddress: null,
    mint: mintAccount.publicKey.toString(),
    priceFunctionType: PriceFunctionType.Constant,
    priceParams: [],
    startingPriceInFullDecimals: 0,
    userId: wallet.publicKey.toString(),
  });

  const transaction = combineTransactions([
    mintMasterEditionTx,
    createEditionDistributorTx,
  ]);

  return sendMintMasterEditionTx({
    connection,
    maxSupply,
    metadata,
    metadataArweaveLink,
    metadataPda,
    mintAccount,
    rawTxExtraData,
    transaction,
    wallet,
  });
}
