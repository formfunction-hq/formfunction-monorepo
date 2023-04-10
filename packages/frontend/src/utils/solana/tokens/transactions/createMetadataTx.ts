import {
  Metadata,
  createCreateMetadataAccountInstruction,
} from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey, Transaction } from "@solana/web3.js";
import ixToTx from "formfn-shared/dist/utils/solana/ix/ixToTx";
import findTokenMetadata from "utils/solana/pdas/findTokenMetadata";

export default async function createMetadataTx(
  feePayer: PublicKey,
  mint: PublicKey,
  mintAuthority: PublicKey,
  updateAuthority: PublicKey,
  metadataData: Metadata
): Promise<Transaction> {
  const [metadata] = await findTokenMetadata(mint);

  const ix = createCreateMetadataAccountInstruction(
    {
      metadata,
      mint,
      mintAuthority,
      payer: feePayer,
      updateAuthority,
    },
    {
      createMetadataAccountArgs: {
        data: metadataData.data,
        isMutable: true,
      },
    }
  );
  return ixToTx(ix);
}
