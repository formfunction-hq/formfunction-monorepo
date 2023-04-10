import BottomDrawer from "components/drawers/BottomDrawer";
import ColorClass from "types/enums/ColorClass";
import styles from "css/drawers/FiltersBottomDrawer.module.css";
import useExploreContext from "hooks/useExploreContext";
import ExploreSortOrder from "types/enums/ExploreSortOrder";
import PlainButton from "components/buttons/PlainButton";
import HUMAN_READABLE_EXPLORE_SORT_ORDER from "constants/HumanReadableExploreSortOrder";
import NavLink from "components/text/NavLink";
import CheckmarkIcon from "components/icons/CheckmarkIcon";
import ColorValue from "types/enums/ColorValue";
import sortOrdersForExploreTab from "utils/sortOrdersForExploreTab";
import isArtworkTab from "utils/explore/isArtworkTab";
import NftFilterSection from "components/pages/common/nft-filters/NftFilterSection";
import ExplorePriceRangeFilter from "components/pages/explore/filters/ExplorePriceRangeFilter";
import ExploreAvailabilityFilter from "components/pages/explore/filters/ExploreAvailabilityFilter";
import ExploreTab from "types/enums/ExploreTab";
import ExploreMarketFilter from "components/pages/explore/filters/ExploreMarketFilter";
import ExploreExtrasFilter from "components/pages/explore/filters/ExploreExtrasFilter";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import HUMAN_READABLE_CAMPAIGN_SORT_ORDER from "constants/HumanReadableCampaignSortOrder";
import { CampaignSortOrder } from "context/ExploreContext";

function SortButtonGeneric({
  isActive,
  label,
  onClick,
}: {
  isActive: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <PlainButton className={styles.sortButton} onClick={onClick}>
      <NavLink
        colorClass={isActive ? ColorClass.BrightPurple : ColorClass.Secondary}
      >
        {label}
      </NavLink>
      {isActive && <CheckmarkIcon colorValue={ColorValue.BrightPurple} />}
    </PlainButton>
  );
}

function SortButton({
  sortOrder,
}: {
  sortOrder: ExploreSortOrder | CampaignSortOrder;
}) {
  const {
    campaigns: {
      setSortOrder: setCampaignsSortOrder,
      sortOrder: campaignsSortOrder,
    },
    sortOrder: currSortOrder,
    setSortOrder,
    tab,
  } = useExploreContext();

  switch (tab) {
    case ExploreTab.Artwork:
    case ExploreTab.Creators:
    case ExploreTab.Editions:
    case ExploreTab.Series: {
      const isActive = sortOrder === currSortOrder;
      return (
        <SortButtonGeneric
          isActive={isActive}
          label={HUMAN_READABLE_EXPLORE_SORT_ORDER[sortOrder]}
          onClick={() => setSortOrder(sortOrder as ExploreSortOrder)}
        />
      );
    }
    case ExploreTab.Campaigns: {
      const isActive = sortOrder === campaignsSortOrder;
      return (
        <SortButtonGeneric
          isActive={isActive}
          label={
            HUMAN_READABLE_CAMPAIGN_SORT_ORDER[sortOrder as CampaignSortOrder]
          }
          onClick={() => setCampaignsSortOrder(sortOrder as CampaignSortOrder)}
        />
      );
    }
    default:
      return assertUnreachable(tab);
  }
}

function Body() {
  const { tab } = useExploreContext();

  const sortSection = (
    <NftFilterSection title="Sort by">
      <div className={styles.sortButtons}>
        {sortOrdersForExploreTab(tab).map((sortOrder) => (
          <SortButton key={sortOrder} sortOrder={sortOrder} />
        ))}
      </div>
    </NftFilterSection>
  );

  return (
    <div className={styles.body}>
      {sortSection}
      {isArtworkTab(tab) && (
        <>
          <ExploreAvailabilityFilter />
          <ExplorePriceRangeFilter />
          {tab === ExploreTab.Artwork && <ExploreMarketFilter />}
          {tab === ExploreTab.Artwork && <ExploreExtrasFilter />}
        </>
      )}
    </div>
  );
}

type Props = {
  isShown: boolean;
  onHide: () => void;
};

export default function FiltersBottomDrawer({
  isShown,
  onHide,
}: Props): JSX.Element {
  return (
    <BottomDrawer isShown={isShown} onHide={onHide} title="Sort & Filter">
      <Body />
    </BottomDrawer>
  );
}
