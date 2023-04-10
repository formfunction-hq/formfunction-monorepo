import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import invariant from "tiny-invariant";
import ExploreExtra from "types/relay/ExploreExtra";

export default function getExploreExtraLabel(exploreExtra: ExploreExtra) {
  invariant(exploreExtra !== RELAY_FUTURE_ADDED_VALUE);
  switch (exploreExtra) {
    case "HasPnft":
      return "Participation NFT";
    case "HasUnlockable":
      return "Unlockable";
    default:
      return assertUnreachable(exploreExtra);
  }
}
