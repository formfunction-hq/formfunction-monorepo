import {
  ParsedInstruction,
  PartiallyDecodedInstruction,
  PublicKey,
} from "@solana/web3.js";
import IsIxResult from "types/IsIxResult";
import arePublicKeysEqual from "utils/compare/arePublicKeysEqual";
import decodeGumdropIx from "utils/solana/ix/decodeGumdropIx";

export default function isGumdropIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction,
  names: Array<string>,
  programId: PublicKey
): IsIxResult {
  const decoded = decodeGumdropIx(ix as PartiallyDecodedInstruction);

  return {
    decoded,
    isIx:
      arePublicKeysEqual(ix.programId, programId) &&
      names.includes(decoded?.name ?? ""),
    ix,
  };
}
