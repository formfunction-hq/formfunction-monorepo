import CAMPAIGN_SORT_ORDERS from "constants/CampaignSortOrders";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import ExploreSortOrder from "types/enums/ExploreSortOrder";
import ExploreTab from "types/enums/ExploreTab";

export default function sortOrdersForExploreTab(tab: ExploreTab) {
  switch (tab) {
    case ExploreTab.Series:
      return [
        ExploreSortOrder.MostRecentlyAddedTo,
        ExploreSortOrder.LeastRecentlyAddedTo,
        ExploreSortOrder.Newest,
        ExploreSortOrder.Oldest,
        // TODO: re-enable these
        // The queries that use these orderings are really inefficient and may end up timing out
        // (i.e. take over 60 seconds). For now, we will not show these as options in the SortButton menu.
        // ExploreSortOrder.MostPieces,
        // ExploreSortOrder.FewestPieces,
      ];
    case ExploreTab.Creators:
      return [ExploreSortOrder.Newest, ExploreSortOrder.Oldest];
    case ExploreTab.Artwork:
      return [
        ExploreSortOrder.Newest,
        ExploreSortOrder.Oldest,
        ExploreSortOrder.HighestPrice,
        ExploreSortOrder.LowestPrice,
        ExploreSortOrder.AuctionEndEarliest,
        ExploreSortOrder.AuctionEndLatest,
      ];
    case ExploreTab.Editions:
      return [
        ExploreSortOrder.Newest,
        ExploreSortOrder.Oldest,
        ExploreSortOrder.HighestPrice,
        ExploreSortOrder.LowestPrice,
        ExploreSortOrder.MostRecentlySold,
      ];
    case ExploreTab.Campaigns:
      return CAMPAIGN_SORT_ORDERS;
    default:
      return assertUnreachable(tab);
  }
}
