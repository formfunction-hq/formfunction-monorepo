import { Instruction } from "@project-serum/anchor";
import { AUCTION_HOUSE_IDL } from "@formfunction-hq/formfunction-auction-house";
import { PartiallyDecodedInstruction, PublicKey } from "@solana/web3.js";
import AUCTION_HOUSE_IDL_WITH_DEPRECATED_INSTRUCTIONS_1 from "constants/old-idls/AuctionHouseIdlWithDeprecatedInstructions1";
import { Maybe } from "types/UtilityTypes";
import decodeWithIdl from "utils/solana/ix/decodeWithIdl";
import emptyFunction from "utils/emptyFunction";
import arePublicKeysEqual from "utils/compare/arePublicKeysEqual";
import AUCTION_HOUSE_IDL_WITH_DEPRECATED_INSTRUCTIONS_2 from "constants/old-idls/AuctionHouseIdlWithDeprecatedInstructions2";
import AUCTION_HOUSE_IDL_WITH_DEPRECATED_INSTRUCTIONS_3 from "constants/old-idls/AuctionHouseIdlWithDeprecatedInstructions3";

export default function decodeAuctionHouseIx(
  ix: PartiallyDecodedInstruction,
  programId: PublicKey,
  onError: (error: Error) => void
): Maybe<Instruction> {
  if (!arePublicKeysEqual(ix.programId, programId)) {
    // If the ix is not an auction house ix, then don't even bother decoding it.
    return null;
  }

  return (
    decodeWithIdl(ix, AUCTION_HOUSE_IDL, emptyFunction) ??
    decodeWithIdl(
      ix,
      AUCTION_HOUSE_IDL_WITH_DEPRECATED_INSTRUCTIONS_3,
      emptyFunction
    ) ??
    decodeWithIdl(
      ix,
      AUCTION_HOUSE_IDL_WITH_DEPRECATED_INSTRUCTIONS_2,
      emptyFunction
    ) ??
    decodeWithIdl(ix, AUCTION_HOUSE_IDL_WITH_DEPRECATED_INSTRUCTIONS_1, onError)
  );
}
