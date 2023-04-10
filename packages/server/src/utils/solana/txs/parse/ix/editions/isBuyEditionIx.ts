import {
  ParsedInstruction,
  PartiallyDecodedInstruction,
} from "@solana/web3.js";
import IsIxResult from "formfn-shared/dist/types/IsIxResult";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import isAuctionHouseIx from "formfn-shared/dist/utils/solana/txs/parse/isAuctionHouseIx";
import getAuctionHouseConstants from "src/utils/solana/getAuctionHouseConstants";

type BuyEditionIxResult = {
  isIxResult: IsIxResult;
  version: "V1" | "V2";
};

export default function isBuyEditionIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction,
  onDecodeError: (e: Error) => void
): Maybe<BuyEditionIxResult> {
  const { programId: auctionHouseProgramId } = getAuctionHouseConstants();

  const ixResultV1 = isAuctionHouseIx(
    ix,
    ["buyEdition"],
    auctionHouseProgramId,
    onDecodeError
  );

  if (ixResultV1.isIx) {
    return { isIxResult: ixResultV1, version: "V1" };
  }

  const ixResultV2 = isAuctionHouseIx(
    ix,
    ["buyEditionV2"],
    auctionHouseProgramId,
    onDecodeError
  );

  if (ixResultV2.isIx) {
    return { isIxResult: ixResultV2, version: "V2" };
  }

  return null;
}
