import {
  ParsedInstruction,
  PartiallyDecodedInstruction,
} from "@solana/web3.js";
import IsIxResult from "formfn-shared/dist/types/IsIxResult";
import isAuctionHouseIx from "formfn-shared/dist/utils/solana/txs/parse/isAuctionHouseIx";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";

export default function isCloseEditionDistributorTokenAccountIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction,
  onDecodeError: (e: Error) => void
): IsIxResult {
  return isAuctionHouseIx(
    ix,
    ["closeEditionDistributorTokenAccount"],
    getAuctionHouseConstants().programId,
    onDecodeError
  );
}
