import { Connection } from "@solana/web3.js";
import AnchorWallet from "types/AnchorWallet";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { NftMetadataV1Input } from "hooks/__generated__/useUploadNftToArweaveMutation.graphql";
import getMintMasterEditionTx from "formfn-shared/dist/utils/solana/metaplex/getMintMasterEditionTx";
import sendMintMasterEditionTx from "utils/solana/metaplex/sendMintMasterEditionTx";
import { AuctionHouseSdk } from "@formfunction-hq/formfunction-auction-house";

type Args = {
  assetFileName: string;
  auctionHouseSdk: AuctionHouseSdk;
  connection: Connection;
  includeCreateLastBidPriceIx?: boolean;
  maxSupply: Maybe<number>;
  metadata: NftMetadataV1Input;
  metadataArweaveLink: string;
  rawTxExtraData?: { [key: string]: any };
  wallet: AnchorWallet;
};

export default async function mintMasterEdition({
  auctionHouseSdk,
  connection,
  includeCreateLastBidPriceIx = false,
  maxSupply,
  metadata,
  metadataArweaveLink,
  rawTxExtraData,
  wallet,
}: Args) {
  const { transaction, mintAccount, metadataPda } =
    await getMintMasterEditionTx(
      auctionHouseSdk,
      connection,
      wallet.publicKey,
      metadata,
      maxSupply,
      metadataArweaveLink,
      includeCreateLastBidPriceIx
    );

  return sendMintMasterEditionTx({
    connection,
    maxSupply,
    metadata,
    metadataArweaveLink,
    metadataPda,
    mintAccount,
    rawTxExtraData:
      rawTxExtraData?.insertNftInput != null
        ? {
            insertNftInput: {
              ...rawTxExtraData.insertNftInput,
              mint: mintAccount.publicKey.toString(),
            },
          }
        : undefined,
    transaction,
    wallet,
  });
}
