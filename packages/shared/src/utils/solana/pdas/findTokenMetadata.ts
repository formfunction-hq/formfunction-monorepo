import { PublicKey } from "@solana/web3.js";
import { TOKEN_METADATA_PROGRAM_ID } from "constants/SolanaConstants";

export default async function findTokenMetadata(mint: PublicKey) {
  return PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
}
