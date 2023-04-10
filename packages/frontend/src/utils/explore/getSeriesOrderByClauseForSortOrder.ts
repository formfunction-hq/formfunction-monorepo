import { Series_order_by } from "components/pages/explore/__generated__/ExploreSeriesGridQuery.graphql";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import ExploreSortOrder from "types/enums/ExploreSortOrder";

export default function getSeriesOrderByClauseForSortOrder(
  sortOrder: ExploreSortOrder
): Array<Series_order_by> {
  switch (sortOrder) {
    case ExploreSortOrder.MostPieces:
      return [{ Nfts_aggregate: { count: "desc" } }];
    case ExploreSortOrder.FewestPieces:
      return [{ Nfts_aggregate: { count: "asc" } }];
    case ExploreSortOrder.Newest:
      return [{ timeCreated: "desc" }];
    case ExploreSortOrder.Oldest:
      return [{ timeCreated: "asc" }];
    case ExploreSortOrder.MostRecentlyAddedTo:
      return [{ timeLastAddedTo: "desc_nulls_last" }];
    case ExploreSortOrder.LeastRecentlyAddedTo:
      return [{ timeLastAddedTo: "asc_nulls_first" }];
    case ExploreSortOrder.AuctionEndEarliest:
    case ExploreSortOrder.AuctionEndLatest:
    case ExploreSortOrder.HighestPrice:
    case ExploreSortOrder.LowestPrice:
    case ExploreSortOrder.MostRecentlySold:
    case ExploreSortOrder.RarityLowest:
    case ExploreSortOrder.RarityHighest:
    case ExploreSortOrder.NameAscending:
    case ExploreSortOrder.NameDescending:
      return [];
    default:
      return assertUnreachable(sortOrder);
  }
}
