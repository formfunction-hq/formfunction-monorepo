import {
  ParsedInstruction,
  PartiallyDecodedInstruction,
  PublicKey,
} from "@solana/web3.js";
import IsIxResult from "types/IsIxResult";
import decodeCandyMachineIx from "utils/solana/ix/decodeCandyMachineIx";

export default function isCandyMachineIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction,
  names: Array<string>,
  programId: PublicKey,
  onDecodeError: (e: Error) => void
): IsIxResult {
  const decoded = decodeCandyMachineIx(
    ix as PartiallyDecodedInstruction,
    programId,
    onDecodeError
  );

  return {
    decoded,
    isIx: decoded != null && names.includes(decoded?.name ?? ""),
    ix,
  };
}
