import NftKind from "formfn-shared/dist/types/enums/NftKind";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

export default function shouldShowOffersForNftKind(nftKind: NftKind): boolean {
  switch (nftKind) {
    case NftKind.MasterEditionWithNonzeroSupply:
    case NftKind.MasterEditionWithUnlimitedSupply:
    case NftKind.PnftMasterEdition:
      return false;
    case NftKind.StandardEditionPrintNonzeroSupply:
    case NftKind.StandardEditionPrintUnlimitedSupply:
    case NftKind.PnftStandardEdition:
    case NftKind.Generative:
    case NftKind.OneOfOne:
      return true;
    default:
      return assertUnreachable(nftKind);
  }
}
