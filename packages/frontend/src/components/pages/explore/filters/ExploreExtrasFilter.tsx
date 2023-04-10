import CheckboxButtonWithLabel from "components/buttons/CheckboxButtonWithLabel";
import FilterItems from "components/pages/common/nft-filters/FilterItems";
import NftFilterSection from "components/pages/common/nft-filters/NftFilterSection";
import useExploreContext from "hooks/useExploreContext";
import getExploreExtraLabel from "utils/explore/getExploreExtraLabel";

export default function ExploreExtrasFilter() {
  const { hasPnft, hasUnlockable, setHasPnft, setHasUnlockable } =
    useExploreContext();

  return (
    <NftFilterSection title="Extras" subtitle="Only show pieces that include:">
      <FilterItems>
        <CheckboxButtonWithLabel
          isActive={hasPnft}
          label={getExploreExtraLabel("HasPnft")}
          onClick={() => setHasPnft(!hasPnft)}
        />
        <CheckboxButtonWithLabel
          isActive={hasUnlockable}
          label={getExploreExtraLabel("HasUnlockable")}
          onClick={() => setHasUnlockable(!hasUnlockable)}
        />
      </FilterItems>
    </NftFilterSection>
  );
}
