import BottomDrawer from "components/drawers/BottomDrawer";
import GenerativeSeriesFilters from "components/pages/generative-series/GenerativeSeriesFilters";
import { useGenerativeSeriesPageAttributesQuery } from "hooks/generative-series-page/__generated__/useGenerativeSeriesPageAttributesQuery.graphql";
import { PreloadedQuery } from "react-relay";

type Props = {
  attributesQueryRef: PreloadedQuery<useGenerativeSeriesPageAttributesQuery>;
  isShown: boolean;
  onHide: () => void;
};

export default function GenerativeSeriesFiltersBottomDrawer({
  attributesQueryRef,
  isShown,
  onHide,
}: Props): JSX.Element {
  return (
    <BottomDrawer isShown={isShown} onHide={onHide} title="Filters">
      <GenerativeSeriesFilters attributesQueryRef={attributesQueryRef} />
    </BottomDrawer>
  );
}
