import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import useSolanaContext from "hooks/useSolanaContext";
import invariant from "tiny-invariant";
import ixToTx from "formfn-shared/dist/utils/solana/ix/ixToTx";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import getNftMintTokenAccountAddressOrAta from "utils/solana/tokens/read/getNftMintTokenAccountAddressOrAta";
import {
  createBurnNftInstruction,
  Metadata,
} from "@metaplex-foundation/mpl-token-metadata";
import findTokenMetadata from "utils/solana/pdas/findTokenMetadata";
import findTokenMasterEdition from "utils/solana/pdas/findTokenMasterEdition";

export default function useBurnNft() {
  const { anchorWallet, connection } = useSolanaContext();

  return async (mint: string) => {
    invariant(anchorWallet != null);
    const mintKey = new PublicKey(mint);
    const [metadataPda] = await findTokenMetadata(mintKey);
    const metadata = await Metadata.fromAccountAddress(connection, metadataPda);
    const [masterEditionAccount] = findTokenMasterEdition(mintKey);
    const tokenAccount = await getNftMintTokenAccountAddressOrAta(
      connection,
      mintKey,
      anchorWallet.publicKey
    );
    const [collectionMetadataPda] =
      metadata.collection != null
        ? await findTokenMetadata(metadata.collection.key)
        : [undefined];

    const ix = createBurnNftInstruction({
      collectionMetadata: collectionMetadataPda,
      masterEditionAccount,
      metadata: metadataPda,
      mint: mintKey,
      owner: anchorWallet.publicKey,
      splTokenProgram: TOKEN_PROGRAM_ID,
      tokenAccount,
    });
    return sendTransactionWithWallet({
      connection,
      loggingData: {
        mint: mintKey.toString(),
        transactionType: "BurnedSeries",
      },
      txs: [ixToTx(ix)],
      wallet: anchorWallet,
    });
  };
}
