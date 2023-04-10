import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import createMetadataTx from "utils/solana/tokens/transactions/createMetadataTx";

// Not used
export default async function createMetadata(
  connection: Connection,
  feePayer: Keypair,
  mint: PublicKey,
  mintAuthority: PublicKey,
  updateAuthority: PublicKey,
  metadataData: Metadata
): Promise<any> {
  const tx = await createMetadataTx(
    feePayer.publicKey,
    mint,
    mintAuthority,
    updateAuthority,
    metadataData
  );

  return sendAndConfirmTransaction(connection, tx, [feePayer]);
}
