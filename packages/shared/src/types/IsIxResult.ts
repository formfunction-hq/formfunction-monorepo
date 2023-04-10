import { Instruction } from "@project-serum/anchor";
import {
  ParsedInstruction,
  PartiallyDecodedInstruction,
} from "@solana/web3.js";
import { Maybe } from "types/UtilityTypes";

type IsIxResult = {
  decoded: Maybe<Instruction>;
  isIx: boolean;
  ix: ParsedInstruction | PartiallyDecodedInstruction;
};

export default IsIxResult;
