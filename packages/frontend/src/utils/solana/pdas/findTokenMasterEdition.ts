import { PublicKey } from "@solana/web3.js";
import { TOKEN_METADATA_PROGRAM_ID } from "formfn-shared/dist/constants/SolanaConstants";

export default function findTokenMasterEdition(mint: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
      Buffer.from("edition"),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
}
