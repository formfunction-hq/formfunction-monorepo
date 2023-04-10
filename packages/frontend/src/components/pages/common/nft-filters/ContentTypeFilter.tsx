import CheckboxButtonWithLabel from "components/buttons/CheckboxButtonWithLabel";
import NftFilterSection from "components/pages/common/nft-filters/NftFilterSection";
import FilterItems from "components/pages/common/nft-filters/FilterItems";
import ContentTypeForFilters from "types/enums/ContentTypeForFilters";

const CONTENT_TYPE_FOR_FILTERS_HUMAN_READABLE = {
  [ContentTypeForFilters.Animated]: "GIFs & Videos",
  [ContentTypeForFilters.Images]: "Images",
};

type Props = {
  addContentType: (val: ContentTypeForFilters) => void;
  contentTypes: Set<ContentTypeForFilters>;
  removeContentType: (val: ContentTypeForFilters) => void;
};

export default function ContentTypeFilter({
  addContentType,
  contentTypes,
  removeContentType,
}: Props) {
  return (
    <NftFilterSection title="Media Type">
      <FilterItems>
        {Object.values(ContentTypeForFilters).map((val) => (
          <CheckboxButtonWithLabel
            key={val}
            isActive={contentTypes.has(val)}
            label={CONTENT_TYPE_FOR_FILTERS_HUMAN_READABLE[val]}
            onClick={() => {
              if (contentTypes.has(val)) {
                removeContentType(val);
              } else {
                addContentType(val);
              }
            }}
          />
        ))}
      </FilterItems>
    </NftFilterSection>
  );
}
