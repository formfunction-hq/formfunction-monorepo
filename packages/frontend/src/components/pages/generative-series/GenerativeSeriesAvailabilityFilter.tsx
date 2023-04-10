import AvailabilityFilter from "components/pages/common/nft-filters/AvailabilityFilter";
import useGenerativeSeriesContext from "hooks/useGenerativeSeriesContext";
import ExploreAvailabilityV2 from "types/enums/ExploreAvailabilityV2";

export default function GenerativeSeriesAvailabilityFilter() {
  const { addAvailability, availabilitySet, removeAvailability } =
    useGenerativeSeriesContext();

  return (
    <AvailabilityFilter
      addAvailability={addAvailability}
      availabilities={[
        ExploreAvailabilityV2.InstantSale,
        ExploreAvailabilityV2.LiveAuctionWithBids,
        ExploreAvailabilityV2.LiveAuctionWithoutBids,
        ExploreAvailabilityV2.ReservePrice,
      ]}
      availabilitySet={availabilitySet}
      removeAvailability={removeAvailability}
    />
  );
}
