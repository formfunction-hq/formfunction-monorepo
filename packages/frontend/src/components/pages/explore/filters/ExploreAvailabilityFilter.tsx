import AvailabilityFilter from "components/pages/common/nft-filters/AvailabilityFilter";
import useExploreContext from "hooks/useExploreContext";
import getExploreAvailabilitiesForExploreTab from "utils/explore/getExploreAvailabilitiesForExploreTab";

export default function ExploreAvailabilityFilter() {
  const { addAvailability, availabilitySet, removeAvailability, tab } =
    useExploreContext();

  const availabilities = getExploreAvailabilitiesForExploreTab(tab);
  return availabilities != null ? (
    <AvailabilityFilter
      addAvailability={addAvailability}
      availabilities={availabilities}
      availabilitySet={availabilitySet}
      removeAvailability={removeAvailability}
    />
  ) : null;
}
