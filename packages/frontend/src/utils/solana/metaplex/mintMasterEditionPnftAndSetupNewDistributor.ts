import FormfnGumdropSdk from "@formfunction-hq/formfunction-gumdrop";
import { Connection } from "@solana/web3.js";
import { NftMetadataV1Input } from "hooks/__generated__/useUploadNftToArweaveMutation.graphql";
import AnchorWallet from "types/AnchorWallet";
import getMintMasterEditionTx from "formfn-shared/dist/utils/solana/metaplex/getMintMasterEditionTx";
import sendMintMasterEditionTx from "utils/solana/metaplex/sendMintMasterEditionTx";
import combineTransactions from "formfn-shared/dist/utils/solana/txs/combineTransactions";
import { AuctionHouseSdk } from "@formfunction-hq/formfunction-auction-house";

type Args = {
  auctionHouseSdk: AuctionHouseSdk;
  connection: Connection;
  gumdropSdk: FormfnGumdropSdk;
  metadata: NftMetadataV1Input;
  metadataArweaveLink: string;
  rawTxExtraData?: { [key: string]: any };
  wallet: AnchorWallet;
};

/**
 * This function mints a new master edition for a pNFT (with undefined for
 * maxSupply to support minting limited editions) and uses that mint to
 * setup a new gumdrop distributor program. On creation, the distributor
 * is initialized with an empty claimants list. This will be updated once the
 * associated auction settles with the relevant auction bidders.
 */
export default async function mintMasterEditionPnftAndSetupNewDistributor({
  auctionHouseSdk,
  connection,
  gumdropSdk,
  metadata,
  metadataArweaveLink,
  rawTxExtraData,
  wallet,
}: Args) {
  const maxSupply = null;
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

  const gumdropDistributorSetupTx =
    await gumdropSdk.newDistributorAndTransferMasterEditionTx(
      {
        configAuthority: gumdropSdk.gumdropConfigAuthority,
        mint: mintAccount.publicKey,
        wallet: wallet.publicKey,
      },
      { claimants: [] }
    );

  const transaction = combineTransactions([
    mintMasterEditionTx,
    gumdropDistributorSetupTx,
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
