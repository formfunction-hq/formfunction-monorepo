import {
  ParsedInstruction,
  PartiallyDecodedInstruction,
  PublicKey,
} from "@solana/web3.js";
import IsIxResult from "types/IsIxResult";
import isAuctionHouseIx from "utils/solana/txs/parse/isAuctionHouseIx";

export default function isBuyIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction,
  programId: PublicKey,
  onDecodeError: (e: Error) => void
): IsIxResult {
  return isAuctionHouseIx(ix, ["buy", "buyV2"], programId, onDecodeError);
}
