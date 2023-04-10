import {
  ParsedInstruction,
  PartiallyDecodedInstruction,
} from "@solana/web3.js";
import isAuctionHouseIx from "formfn-shared/dist/utils/solana/txs/parse/isAuctionHouseIx";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";

export default function isUpdateEditionDistributorIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction,
  onDecodeError: (e: Error) => void
) {
  return isAuctionHouseIx(
    ix,
    ["updateEditionDistributor"],
    getAuctionHouseConstants().programId,
    onDecodeError
  );
}
