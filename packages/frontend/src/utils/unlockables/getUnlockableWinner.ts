import NftKind from "formfn-shared/dist/types/enums/NftKind";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";

export default function getUnlockableWinner<T extends Record<string, unknown>>(
  winners: MaybeUndef<ReadonlyArray<T>>,
  nftKind: NftKind
): Maybe<T> {
  switch (nftKind) {
    case NftKind.OneOfOne:
      // For 1/1s there is only one sale and one unlockable winner.
      return winners?.[0] ?? null;
    case NftKind.MasterEditionWithNonzeroSupply:
      // If unlockables are supported for editions in the future, this logic
      // will need to be updated. The winner would be the UnlockableWinner where
      // userId matches the current userId. The NFT creator would be able to
      // view all the winners.
      return null;
    case NftKind.StandardEditionPrintNonzeroSupply:
    case NftKind.StandardEditionPrintUnlimitedSupply:
    case NftKind.MasterEditionWithUnlimitedSupply:
    case NftKind.PnftMasterEdition:
    case NftKind.PnftStandardEdition:
    case NftKind.Generative:
      return null;
    default:
      return assertUnreachable(nftKind);
  }
}
