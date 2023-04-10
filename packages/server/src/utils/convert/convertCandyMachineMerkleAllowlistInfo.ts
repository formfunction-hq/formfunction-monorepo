import { CandyMachineMerkleAllowlistInfo } from "@prisma/client";
import Typename from "src/types/enums/Typename";
import {
  CandyMachineMerkleAllowlistInfoForViewerExpress,
  Maybe,
} from "src/__generated__/generated";

export default function convertCandyMachineMerkleAllowlistInfo(
  candyMachineMerkleAllowlistInfo: Maybe<CandyMachineMerkleAllowlistInfo>,
  amountMintedByViewerDuringAllowlist: number
): Maybe<CandyMachineMerkleAllowlistInfoForViewerExpress> {
  if (candyMachineMerkleAllowlistInfo == null) {
    return null;
  }

  const { amountAllowed, proof, rootIndex } = candyMachineMerkleAllowlistInfo;

  return {
    __typename: Typename.CandyMachineMerkleAllowlistInfoForViewer,
    amountAllowed,
    amountMinted: amountMintedByViewerDuringAllowlist,
    merkleRootIndexForProof: rootIndex,
    proof,
  };
}
