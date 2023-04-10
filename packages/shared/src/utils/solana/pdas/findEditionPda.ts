import { PublicKey } from "@solana/web3.js";
import { TOKEN_METADATA_PROGRAM_ID } from "constants/SolanaConstants";

export default async function findEditionPda(mint: PublicKey) {
  return PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
      Buffer.from("edition"),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
}
