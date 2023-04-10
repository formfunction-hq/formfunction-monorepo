import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import ExploreTab from "types/enums/ExploreTab";

export default function isArtworkTab(tab: ExploreTab) {
  switch (tab) {
    case ExploreTab.Artwork:
    case ExploreTab.Editions:
      return true;
    case ExploreTab.Creators:
    case ExploreTab.Series:
    case ExploreTab.Campaigns:
      return false;
    default:
      return assertUnreachable(tab);
  }
}
