import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  ParsedInstruction,
  PartiallyDecodedInstruction,
} from "@solana/web3.js";
import arePublicKeysEqual from "formfn-shared/dist/utils/compare/arePublicKeysEqual";

export default function isInitializeAccountIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction,
  account?: string
) {
  return (
    arePublicKeysEqual(ix.programId, TOKEN_PROGRAM_ID) &&
    (ix as ParsedInstruction).parsed?.type?.includes("initializeAccount") ===
      true &&
    (account == null ||
      (ix as ParsedInstruction).parsed?.info?.account?.toString() === account)
  );
}
