/* eslint-disable no-await-in-loop */
import AnchorWallet from "types/AnchorWallet";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  createSetAndVerifyCollectionInstruction,
  createUnverifyCollectionInstruction,
  Metadata,
} from "@metaplex-foundation/mpl-token-metadata";
import combineTransactions from "formfn-shared/dist/utils/solana/txs/combineTransactions";
import findTokenMetadata from "utils/solana/pdas/findTokenMetadata";
import findTokenMasterEdition from "utils/solana/pdas/findTokenMasterEdition";
import ixToTx from "formfn-shared/dist/utils/solana/ix/ixToTx";

export default async function manageSeriesNftsTxs(
  connection: Connection,
  wallet: AnchorWallet,
  seriesMint: PublicKey,
  mints: Array<PublicKey>,
  remove: boolean
) {
  if (mints.length === 0) {
    return null;
  }

  const [[seriesMetadataAccount], [seriesMasterEdition]] = await Promise.all([
    findTokenMetadata(seriesMint),
    findTokenMasterEdition(seriesMint),
  ]);
  const verifyTxs = await Promise.all(
    mints.map(async (mint) => {
      const [metadataPda] = await findTokenMetadata(mint);
      const commonAccounts = {
        collection: seriesMetadataAccount,
        collectionAuthority: wallet.publicKey,
        collectionMasterEditionAccount: seriesMasterEdition,
        collectionMint: seriesMint,
        metadata: metadataPda,
        payer: wallet.publicKey,
      };

      if (remove) {
        return ixToTx(createUnverifyCollectionInstruction(commonAccounts));
      }
      const metadata = await Metadata.fromAccountAddress(
        connection,
        metadataPda
      );
      if (metadata.collection?.key != null && metadata.collection.verified) {
        // This series already belongs to an onchain collection so we must first unverify it
        // and then add it to the desired series.
        const existingSeriesMint = metadata.collection.key;
        const [[existingSeriesMetadataAccount], [existingSeriesMasterEdition]] =
          await Promise.all([
            findTokenMetadata(existingSeriesMint),
            findTokenMasterEdition(existingSeriesMint),
          ]);
        const unverifyTx = ixToTx(
          createUnverifyCollectionInstruction({
            ...commonAccounts,
            collection: existingSeriesMetadataAccount,
            collectionMasterEditionAccount: existingSeriesMasterEdition,
            collectionMint: existingSeriesMint,
          })
        );
        return unverifyTx.add(
          createSetAndVerifyCollectionInstruction({
            ...commonAccounts,
            updateAuthority: wallet.publicKey,
          })
        );
      }

      return ixToTx(
        createSetAndVerifyCollectionInstruction({
          ...commonAccounts,
          updateAuthority: wallet.publicKey,
        })
      );
    })
  );

  return combineTransactions(verifyTxs);
}
