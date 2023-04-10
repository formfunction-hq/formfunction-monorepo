import CheckboxButtonWithLabel from "components/buttons/CheckboxButtonWithLabel";
import NftFilterSection from "components/pages/common/nft-filters/NftFilterSection";
import FilterItems from "components/pages/common/nft-filters/FilterItems";
import CampaignCategoryExpress_enum from "types/relay/CampaignCategoryExpress_enum";
import CAMPAIGN_CATEGORIES from "constants/CampaignCategories";
import HUMAN_READABLE_CAMPAIGN_CATEGORY from "constants/HumanReadableCampaignCategory";

type Props = {
  addCategory: (val: CampaignCategoryExpress_enum) => void;
  removeCategory: (val: CampaignCategoryExpress_enum) => void;
  selectedCategories: ReadonlyArray<CampaignCategoryExpress_enum>;
};

export default function CategoryFilter({
  addCategory,
  removeCategory,
  selectedCategories,
}: Props) {
  return (
    <NftFilterSection title="Category">
      <FilterItems>
        {CAMPAIGN_CATEGORIES.map((val) => (
          <CheckboxButtonWithLabel
            key={val}
            isActive={selectedCategories.includes(val)}
            label={HUMAN_READABLE_CAMPAIGN_CATEGORY[val]}
            onClick={() => {
              if (selectedCategories.includes(val)) {
                removeCategory(val);
              } else {
                addCategory(val);
              }
            }}
          />
        ))}
      </FilterItems>
    </NftFilterSection>
  );
}
