import { createTransferCheckedInstruction } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import findAta from "formfn-shared/dist/utils/solana/pdas/findAta";
import createAtaIx from "formfn-shared/dist/utils/solana/instructions/createAtaIx";
import useSolanaContext from "hooks/useSolanaContext";
import invariant from "tiny-invariant";
import ixsToTx from "utils/solana/misc/ixsToTx";
import sendTransactionWithWallet from "utils/solana/misc/sendTransactionWithWallet";
import getNftMintTokenAccountAddressOrAta from "utils/solana/tokens/read/getNftMintTokenAccountAddressOrAta";

async function getCreateAtaIx(
  connection: Connection,
  mint: PublicKey,
  destination: PublicKey,
  destinationAta: PublicKey,
  payer: PublicKey
) {
  const destinationAtaAccountInfo = await connection.getAccountInfo(
    destinationAta,
    "confirmed"
  );
  if (destinationAtaAccountInfo != null) {
    // No need to create the ATA
    return null;
  }

  return createAtaIx(mint, destination, payer);
}

export default function useTransferNft() {
  const { anchorWallet, connection } = useSolanaContext();

  return async (
    mint: string,
    destination: PublicKey
  ): Promise<{
    createdAta: boolean;
    txid: Maybe<string>;
  }> => {
    invariant(anchorWallet != null);
    const mintKey = new PublicKey(mint);
    const sourceAccount = await getNftMintTokenAccountAddressOrAta(
      connection,
      mintKey,
      anchorWallet.publicKey
    );
    const [destinationAta] = await findAta(destination, mintKey);
    // If the destination ATA doesn't exist, we need to create it, otherwise
    // the transfer will fail.
    const createAtaIxInner = await getCreateAtaIx(
      connection,
      mintKey,
      destination,
      destinationAta,
      anchorWallet.publicKey
    );

    const transferIx = createTransferCheckedInstruction(
      sourceAccount,
      mintKey,
      destinationAta,
      anchorWallet.publicKey,
      1,
      0,
      []
    );

    const txid = await sendTransactionWithWallet({
      connection,
      loggingData: {
        destination: destination.toString(),
        mint: mintKey.toString(),
        transactionType: "Transferred",
      },
      txs: [ixsToTx(filterNulls([createAtaIxInner, transferIx]))],
      wallet: anchorWallet,
    });

    return { createdAta: txid != null && createAtaIx != null, txid };
  };
}
