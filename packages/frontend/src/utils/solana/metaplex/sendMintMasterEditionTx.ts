import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import logIfNotProd from "utils/logIfNotProd";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import { NftMetadataV1Input } from "hooks/__generated__/useUploadNftToArweaveMutation.graphql";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import AnchorWallet from "types/AnchorWallet";

type MintMasterEditionArgs = {
  connection: Connection;
  maxSupply: Maybe<number>;
  metadata: NftMetadataV1Input;
  metadataArweaveLink: string;
  metadataPda: PublicKey;
  mintAccount: Keypair;
  rawTxExtraData?: { [key: string]: any };
  transaction: Transaction;
  wallet: AnchorWallet;
};

export type MintMasterEditionResult = {
  metadataAccount: PublicKey;
  mintAccount: PublicKey;
  mintNftTxid: string;
};

export default async function sendMintMasterEditionTx({
  connection,
  maxSupply,
  metadata,
  metadataArweaveLink,
  metadataPda,
  mintAccount,
  rawTxExtraData,
  transaction,
  wallet,
}: MintMasterEditionArgs): Promise<Maybe<MintMasterEditionResult>> {
  logIfNotProd("sending create tx");

  const mintNftTxid = await sendTransactionWithWallet({
    afterSignCallback: (unfinalizedTxid) => {
      commitRawTxMutation({
        extraData: {
          ...(rawTxExtraData ?? {}),
        },
        mint: mintAccount.publicKey.toString(),
        rawTxType: CommitRawTxType.MintMasterEdition,
        txid: unfinalizedTxid,
      });
    },
    connection,
    loggingData: {
      maxSupply,
      metadata,
      metadataArweaveLink,
      transactionType: "Minted",
    },
    signers: [mintAccount],
    txs: [transaction],
    wallet,
  });
  if (mintNftTxid == null) {
    return null;
  }
  logIfNotProd("mint txid", mintNftTxid);

  return {
    metadataAccount: metadataPda,
    mintAccount: mintAccount.publicKey,
    mintNftTxid,
  };
}
