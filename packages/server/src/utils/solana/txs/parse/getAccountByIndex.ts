import {
  ParsedInstruction,
  PartiallyDecodedInstruction,
  PublicKey,
} from "@solana/web3.js";

export default function getAccountByIndex(
  ix: PartiallyDecodedInstruction | ParsedInstruction,
  index: number
): PublicKey {
  return (ix as PartiallyDecodedInstruction).accounts[index];
}
