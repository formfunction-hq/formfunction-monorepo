import FiltersButton from "components/buttons/FiltersButton";
import FiltersButtonWithPopover from "components/buttons/FiltersButtonWithPopover";
import GenerativeSeriesFiltersBottomDrawer from "components/drawers/GenerativeSeriesFiltersBottomDrawer";
import GenerativeSeriesFilters from "components/pages/generative-series/GenerativeSeriesFilters";
import { useGenerativeSeriesPageAttributesQuery } from "hooks/generative-series-page/__generated__/useGenerativeSeriesPageAttributesQuery.graphql";
import useBreakpoint from "hooks/useBreakpoint";
import { useState } from "react";
import { PreloadedQuery } from "react-relay";

type Props = {
  attributesQueryRef: PreloadedQuery<useGenerativeSeriesPageAttributesQuery>;
};

export default function FiltersButtonForGenerativeSeries({
  attributesQueryRef,
}: Props): JSX.Element {
  const { isMobileBreakpoint, isTabletWideBreakpoint } = useBreakpoint();
  const [isBottomDrawerShown, setIsBottomDrawerShown] = useState(false);

  if (isTabletWideBreakpoint) {
    return (
      <>
        <GenerativeSeriesFiltersBottomDrawer
          attributesQueryRef={attributesQueryRef}
          isShown={isBottomDrawerShown}
          onHide={() => setIsBottomDrawerShown(false)}
        />
        <FiltersButton
          hideLabel={isMobileBreakpoint}
          onClick={() => setIsBottomDrawerShown((curr) => !curr)}
        />
      </>
    );
  }

  return (
    <FiltersButtonWithPopover
      hideLabel={isMobileBreakpoint}
      popoverContent={
        <GenerativeSeriesFilters
          attributesQueryRef={attributesQueryRef}
          maxWidth={360}
        />
      }
    />
  );
}
