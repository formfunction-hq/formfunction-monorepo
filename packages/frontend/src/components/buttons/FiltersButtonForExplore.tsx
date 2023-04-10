import FiltersButtonWithPopover from "components/buttons/FiltersButtonWithPopover";
import ExploreAvailabilityFilter from "components/pages/explore/filters/ExploreAvailabilityFilter";
import ExploreExtrasFilter from "components/pages/explore/filters/ExploreExtrasFilter";
import ExploreMarketFilter from "components/pages/explore/filters/ExploreMarketFilter";
import ExplorePriceRangeFilter from "components/pages/explore/filters/ExplorePriceRangeFilter";
import styles from "css/buttons/FiltersButtonForExplore.module.css";
import useExploreContext from "hooks/useExploreContext";
import ExploreTab from "types/enums/ExploreTab";

function PopoverContent(): JSX.Element {
  const { tab } = useExploreContext();

  return (
    <div className={styles.popoverContent}>
      <ExplorePriceRangeFilter />
      <ExploreAvailabilityFilter />
      {tab === ExploreTab.Artwork && <ExploreMarketFilter />}
      {tab === ExploreTab.Artwork && <ExploreExtrasFilter />}
    </div>
  );
}

export default function FiltersButtonForExplore(): JSX.Element {
  return (
    <FiltersButtonWithPopover hideLabel popoverContent={<PopoverContent />} />
  );
}
