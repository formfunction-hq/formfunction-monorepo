import { Connection, PublicKey } from "@solana/web3.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import findTokenMetadata from "utils/solana/pdas/findTokenMetadata";

export default async function getOnchainNftMetadata(
  connection: Connection,
  mint: PublicKey
): Promise<{ metadata: Metadata; metadataPda: PublicKey }> {
  const [metadataPda] = await findTokenMetadata(mint);

  return {
    metadata: await Metadata.fromAccountAddress(connection, metadataPda),
    metadataPda,
  };
}
