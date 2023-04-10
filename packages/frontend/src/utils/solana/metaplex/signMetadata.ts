import { createSignMetadataInstruction } from "@metaplex-foundation/mpl-token-metadata";
import { Connection, PublicKey } from "@solana/web3.js";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import commitRawTxMutation from "utils/relay/commitRawTxMutation";
import CommitRawTxType from "formfn-shared/dist/types/enums/CommitRawTxType";
import AnchorWallet from "types/AnchorWallet";
import findTokenMetadata from "utils/solana/pdas/findTokenMetadata";
import ixToTx from "formfn-shared/dist/utils/solana/ix/ixToTx";

export default async function signMetadata(
  connection: Connection,
  wallet: AnchorWallet,
  mint: PublicKey
) {
  const [metadataPda] = await findTokenMetadata(mint);
  const ix = createSignMetadataInstruction({
    creator: wallet.publicKey,
    metadata: metadataPda,
  });

  const txid = await sendTransactionWithWallet({
    afterSignCallback: (unfinalizedTxid) => {
      commitRawTxMutation({
        extraData: {
          // We should ignore this when trying to insert txs from NftTransactionRaw
          shouldIgnore: true,
          wallet: wallet.toString(),
        },
        mint: mint.toString(),
        rawTxType: CommitRawTxType.SignMetadata,
        txid: unfinalizedTxid,
      });
    },
    connection,
    loggingData: {
      mint: mint.toString(),
      transactionType: CommitRawTxType.SignMetadata,
      wallet: wallet.toString(),
    },
    signers: [],
    txs: [ixToTx(ix)],
    wallet,
  });

  return txid;
}
