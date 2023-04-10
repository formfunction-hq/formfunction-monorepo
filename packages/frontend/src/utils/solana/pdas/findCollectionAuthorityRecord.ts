import { PublicKey } from "@solana/web3.js";
import { TOKEN_METADATA_PROGRAM_ID } from "formfn-shared/dist/constants/SolanaConstants";

export default async function findTokenCollectionAuthorityRecord(
  mint: PublicKey,
  collectionAuthority: PublicKey
) {
  return PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
      Buffer.from("collection_authority"),
      collectionAuthority.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
}
