import ExploreSortOrder from "types/enums/ExploreSortOrder";

const HUMAN_READABLE_EXPLORE_SORT_ORDER: Record<ExploreSortOrder, string> = {
  [ExploreSortOrder.Newest]: "Newest",
  [ExploreSortOrder.Oldest]: "Oldest",
  [ExploreSortOrder.HighestPrice]: "Highest price",
  [ExploreSortOrder.LowestPrice]: "Lowest price",
  [ExploreSortOrder.AuctionEndEarliest]: "Ending soonest",
  [ExploreSortOrder.AuctionEndLatest]: "Ending latest",
  [ExploreSortOrder.MostRecentlyAddedTo]: "Most recently added to",
  [ExploreSortOrder.LeastRecentlyAddedTo]: "Least recently added to",
  [ExploreSortOrder.MostRecentlySold]: "Most recently sold",
  [ExploreSortOrder.MostPieces]: "Most pieces",
  [ExploreSortOrder.FewestPieces]: "Fewest pieces",
  [ExploreSortOrder.RarityHighest]: "Most rare",
  [ExploreSortOrder.RarityLowest]: "Least rare",
  [ExploreSortOrder.NameAscending]: "Name (A to Z)",
  [ExploreSortOrder.NameDescending]: "Name (Z to A)",
};

export default HUMAN_READABLE_EXPLORE_SORT_ORDER;
