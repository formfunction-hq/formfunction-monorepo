import CheckboxButtonWithLabel from "components/buttons/CheckboxButtonWithLabel";
import NftFilterSection from "components/pages/common/nft-filters/NftFilterSection";
import useExploreContext from "hooks/useExploreContext";
import ExploreMarket from "types/enums/ExploreMarket";
import FilterItems from "components/pages/common/nft-filters/FilterItems";

export default function ExploreMarketFilter() {
  const {
    primaryMarket,
    secondaryMarket,
    setPrimaryMarket,
    setSecondaryMarket,
  } = useExploreContext();

  return (
    <NftFilterSection title="Market">
      <FilterItems>
        <CheckboxButtonWithLabel
          isActive={primaryMarket}
          label={ExploreMarket.Primary}
          onClick={() => setPrimaryMarket(!primaryMarket)}
        />
        <CheckboxButtonWithLabel
          isActive={secondaryMarket}
          label={ExploreMarket.Secondary}
          onClick={() => setSecondaryMarket(!secondaryMarket)}
        />
      </FilterItems>
    </NftFilterSection>
  );
}
