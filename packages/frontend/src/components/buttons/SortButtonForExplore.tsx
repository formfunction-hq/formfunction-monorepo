import SortButton from "components/buttons/SortButton";
import HUMAN_READABLE_CAMPAIGN_SORT_ORDER from "constants/HumanReadableCampaignSortOrder";
import HUMAN_READABLE_EXPLORE_SORT_ORDER from "constants/HumanReadableExploreSortOrder";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import useExploreContext from "hooks/useExploreContext";
import ExploreTab from "types/enums/ExploreTab";
import sortOrdersForExploreTab from "utils/sortOrdersForExploreTab";

export default function SortButtonForExplore(): JSX.Element {
  const {
    campaigns: {
      setSortOrder: setCampaignsSortOrder,
      sortOrder: campaignsSortOrder,
    },
    setSortOrder,
    sortOrder,
    tab,
  } = useExploreContext();

  const options = sortOrdersForExploreTab(tab);

  switch (tab) {
    case ExploreTab.Artwork:
    case ExploreTab.Creators:
    case ExploreTab.Editions:
    case ExploreTab.Series:
      return (
        <SortButton
          humanReadableSortOrder={HUMAN_READABLE_EXPLORE_SORT_ORDER}
          options={options}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder as (val: string) => void}
        />
      );
    case ExploreTab.Campaigns:
      return (
        <SortButton
          humanReadableSortOrder={HUMAN_READABLE_CAMPAIGN_SORT_ORDER}
          options={options}
          sortOrder={campaignsSortOrder}
          setSortOrder={setCampaignsSortOrder as (val: string) => void}
        />
      );
    default:
      return assertUnreachable(tab);
  }
}
