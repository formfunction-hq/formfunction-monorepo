import { BorshInstructionCoder, Idl, Instruction } from "@project-serum/anchor";
import { PartiallyDecodedInstruction } from "@solana/web3.js";
import { Maybe } from "types/UtilityTypes";

export default function decodeWithIdl(
  ix: PartiallyDecodedInstruction,
  idl: Idl,
  onError: (error: Error) => void
): Maybe<Instruction> {
  try {
    const ixCoder = new BorshInstructionCoder(idl);
    return ixCoder.decode(
      (ix as PartiallyDecodedInstruction).data ?? "",
      "base58"
    );
  } catch (e) {
    if (onError != null) {
      onError(e as Error);
    }
    return null;
  }
}
