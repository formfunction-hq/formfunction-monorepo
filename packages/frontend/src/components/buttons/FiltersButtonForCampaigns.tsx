import FiltersButtonWithPopover from "components/buttons/FiltersButtonWithPopover";
import FlexBox from "components/layout/FlexBox";
import ExploreCategoriesFilter from "components/pages/explore/filters/ExploreCategoriesFilter";

function PopoverContent(): JSX.Element {
  return (
    <FlexBox flexDirection="column" gap={36} width={360}>
      <ExploreCategoriesFilter />
    </FlexBox>
  );
}

export default function FiltersButtonForCampaigns(): JSX.Element {
  return (
    <FiltersButtonWithPopover hideLabel popoverContent={<PopoverContent />} />
  );
}
