import NftKind from "types/enums/NftKind";
import { Maybe } from "types/UtilityTypes";

export default function getNftKind(
  isMasterEdition: boolean,
  isPnft: boolean,
  maxSupply: Maybe<number>,
  maxSupplyOfMasterEdition: Maybe<number>,
  hasCandyMachine: boolean
): NftKind {
  if (hasCandyMachine) {
    return NftKind.Generative;
  }

  if (isPnft) {
    return isMasterEdition
      ? NftKind.PnftMasterEdition
      : NftKind.PnftStandardEdition;
  }

  if (!isMasterEdition) {
    return maxSupplyOfMasterEdition == null
      ? NftKind.StandardEditionPrintUnlimitedSupply
      : NftKind.StandardEditionPrintNonzeroSupply;
  }

  if (maxSupply == null) {
    return NftKind.MasterEditionWithUnlimitedSupply;
  }

  return maxSupply === 0
    ? NftKind.OneOfOne
    : NftKind.MasterEditionWithNonzeroSupply;
}
