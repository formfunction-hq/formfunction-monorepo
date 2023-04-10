import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import ExploreAvailabilityV2 from "types/enums/ExploreAvailabilityV2";
import ExploreTab from "types/enums/ExploreTab";

export default function getExploreAvailabilitiesForExploreTab(
  tab: ExploreTab
): Maybe<Array<ExploreAvailabilityV2>> {
  switch (tab) {
    case ExploreTab.Artwork:
      return [
        ExploreAvailabilityV2.LiveAuctionWithBids,
        ExploreAvailabilityV2.LiveAuctionWithoutBids,
        ExploreAvailabilityV2.ReservePrice,
        ExploreAvailabilityV2.InstantSale,
        ExploreAvailabilityV2.Sold,
      ];
    case ExploreTab.Editions:
      return [ExploreAvailabilityV2.Available, ExploreAvailabilityV2.SoldOut];
    case ExploreTab.Creators:
    case ExploreTab.Series:
    case ExploreTab.Campaigns:
      return null;
    default:
      return assertUnreachable(tab);
  }
}
