import {
  ParsedInstruction,
  PartiallyDecodedInstruction,
  PublicKey,
} from "@solana/web3.js";
import arePublicKeysEqual from "utils/compare/arePublicKeysEqual";
import IsIxResult from "types/IsIxResult";
import decodeAuctionHouseIx from "utils/solana/ix/decodeAuctionHouseIx";

// TODO: move to auction house SDK
export default function isAuctionHouseIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction,
  names: Array<string>,
  programId: PublicKey,
  onDecodeError: (e: Error) => void
): IsIxResult {
  const decoded = decodeAuctionHouseIx(
    ix as PartiallyDecodedInstruction,
    programId,
    onDecodeError
  );

  return {
    decoded,
    isIx:
      decoded != null &&
      arePublicKeysEqual(ix.programId, programId) &&
      names.includes(decoded?.name ?? ""),
    ix,
  };
}
