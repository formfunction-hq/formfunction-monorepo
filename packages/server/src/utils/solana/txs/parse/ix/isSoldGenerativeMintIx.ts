import {
  ParsedInstruction,
  PartiallyDecodedInstruction,
} from "@solana/web3.js";
import IsIxResult from "formfn-shared/dist/types/IsIxResult";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import isCandyMachineIx from "formfn-shared/dist/utils/solana/txs/parse/isCandyMachineIx";
import loadCandyMachineSdk from "src/utils/solana/loadCandyMachineSdk";

export default async function isSoldGenerativeMintIx(
  ix: ParsedInstruction | PartiallyDecodedInstruction,
  onDecodeError: (e: Error) => void
): Promise<Maybe<IsIxResult>> {
  const candyMachineSdk = loadCandyMachineSdk();
  const programId = candyMachineSdk.candyMachineProgramId;

  return isCandyMachineIx(ix, ["mintNft"], programId, onDecodeError);
}
