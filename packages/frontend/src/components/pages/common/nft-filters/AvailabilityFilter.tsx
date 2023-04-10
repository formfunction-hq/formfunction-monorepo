import CheckboxButtonWithLabel from "components/buttons/CheckboxButtonWithLabel";
import NftFilterSection from "components/pages/common/nft-filters/NftFilterSection";
import formatExploreAvailabilityV2 from "utils/explore/formatExploreAvailabilityV2";
import ExploreAvailabilityV2 from "types/enums/ExploreAvailabilityV2";
import FilterItems from "components/pages/common/nft-filters/FilterItems";

type Props = {
  addAvailability: (val: ExploreAvailabilityV2) => void;
  availabilities: ReadonlyArray<ExploreAvailabilityV2>;
  availabilitySet: Set<ExploreAvailabilityV2>;
  removeAvailability: (val: ExploreAvailabilityV2) => void;
};

export default function AvailabilityFilter({
  addAvailability,
  availabilities,
  availabilitySet,
  removeAvailability,
}: Props) {
  return (
    <NftFilterSection title="Availability">
      <FilterItems>
        {availabilities.map((val) => (
          <CheckboxButtonWithLabel
            key={val}
            isActive={availabilitySet.has(val)}
            label={formatExploreAvailabilityV2(val)}
            onClick={() => {
              if (availabilitySet.has(val)) {
                removeAvailability(val);
              } else {
                addAvailability(val);
              }
            }}
          />
        ))}
      </FilterItems>
    </NftFilterSection>
  );
}
