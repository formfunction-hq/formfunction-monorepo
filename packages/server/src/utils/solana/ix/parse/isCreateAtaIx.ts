import { ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { ParsedInstruction } from "@solana/web3.js";

export default function isCreateAtaIx(ix: ParsedInstruction) {
  return (
    ix.programId.equals(ASSOCIATED_TOKEN_PROGRAM_ID) &&
    (ix as ParsedInstruction).parsed?.type === "create"
  );
}
