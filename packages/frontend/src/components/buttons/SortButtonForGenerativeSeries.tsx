import SortButton from "components/buttons/SortButton";
import HUMAN_READABLE_EXPLORE_SORT_ORDER from "constants/HumanReadableExploreSortOrder";
import useGenerativeSeriesContext from "hooks/useGenerativeSeriesContext";
import ExploreSortOrder from "types/enums/ExploreSortOrder";

const SORT_OPTIONS = [
  ExploreSortOrder.RarityHighest,
  ExploreSortOrder.RarityLowest,
  ExploreSortOrder.HighestPrice,
  ExploreSortOrder.LowestPrice,
];

export default function SortButtonForGenerativeSeries(): JSX.Element {
  const { setSortOrder, sortOrder } = useGenerativeSeriesContext();
  return (
    <SortButton
      humanReadableSortOrder={HUMAN_READABLE_EXPLORE_SORT_ORDER}
      options={SORT_OPTIONS}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder as (val: string) => void}
    />
  );
}
