/* eslint-disable no-await-in-loop */
import { Connection, PublicKey } from "@solana/web3.js";
import AnchorWallet from "types/AnchorWallet";
import { notify } from "components/toast/notifications";
import logIfNotProd from "utils/logIfNotProd";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import findTokenMetadata from "utils/solana/pdas/findTokenMetadata";
import getUpdateMetadataTx from "formfn-shared/dist/utils/solana/metaplex/getUpdateMetadataTx";
import MetadataV2UpdateFields from "formfn-shared/dist/types/MetadataV2UpdateFields";

export default async function updateMetadata(
  connection: Connection,
  wallet: AnchorWallet,
  mint: PublicKey,
  updateFields: MetadataV2UpdateFields,
  notifyString?: string,
  rawTxExtraData?: { [key: string]: any }
) {
  const { tx: updateMetadataTx, updateFields: newData } =
    await getUpdateMetadataTx(connection, wallet.publicKey, mint, updateFields);
  const [metadataPda] = await findTokenMetadata(mint);

  const updateTxid = await sendTransactionWithWallet({
    afterSignCallback: (unfinalizedTxid) => {
      commitRawTxMutation({
        extraData: { newData, ...(rawTxExtraData ?? {}) },
        mint: mint.toString(),
        rawTxType: CommitRawTxType.UpdateMetadata,
        txid: unfinalizedTxid,
      });
    },
    connection,
    loggingData: {
      mint: mint.toString(),
      newData,
      transactionType: "UpdateMetadata",
    },
    signers: [],
    txs: [updateMetadataTx],
    wallet,
  });
  if (updateTxid == null) {
    return null;
  }
  logIfNotProd("mint txid", updateTxid);
  notify({ message: notifyString ?? "Updated metadata!", txid: updateTxid });

  return {
    metadataAccount: metadataPda,
    mint,
    updateTxid,
  };
}
