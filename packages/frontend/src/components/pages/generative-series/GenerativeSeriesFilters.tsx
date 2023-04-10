import graphql from "babel-plugin-relay/macro";
import GenerativeSeriesPriceRangeFilter from "components/pages/generative-series/GenerativeSeriesPriceRangeFilter";
import styles from "css/pages/generative-series/GenerativeSeriesFilters.module.css";
import GenerativeSeriesAttributesFilter from "components/pages/generative-series/GenerativeSeriesAttributesFilter";
import GenerativeSeriesAvailabilityFilter from "components/pages/generative-series/GenerativeSeriesAvailabilityFilter";
import { PreloadedQuery, useFragment, usePreloadedQuery } from "react-relay";
import { useGenerativeSeriesPageAttributesQuery } from "hooks/generative-series-page/__generated__/useGenerativeSeriesPageAttributesQuery.graphql";
import { generativeSeriesAttributesQuery } from "hooks/generative-series-page/useGenerativeSeriesPageAttributes";
import { GenerativeSeriesFilters_AttributesForSeriesResponse$key } from "components/pages/generative-series/__generated__/GenerativeSeriesFilters_AttributesForSeriesResponse.graphql";
import groupBy from "formfn-shared/dist/utils/array/groupBy";
import { Suspense } from "react";
import GenerativeSeriesContentTypeFilter from "components/pages/generative-series/GenerativeSeriesContentTypeFilter";

const fragment = graphql`
  fragment GenerativeSeriesFilters_AttributesForSeriesResponse on AttributesForSeriesResponse {
    traits {
      count
      traitName
      traitValue
    }
  }
`;

function FragmentLoader({
  attributesForSeriesResponse,
}: {
  attributesForSeriesResponse: GenerativeSeriesFilters_AttributesForSeriesResponse$key;
}) {
  const attributesForSeriesResponseData = useFragment(
    fragment,
    attributesForSeriesResponse
  );

  if (attributesForSeriesResponseData.traits.length === 0) {
    return null;
  }

  const traits = groupBy(
    attributesForSeriesResponseData.traits,
    (trait) => trait.traitName
  );

  return (
    <GenerativeSeriesAttributesFilter
      traits={Object.keys(traits).map((traitName) => ({
        traitName,
        traitValues: traits[traitName].map(({ count, traitValue }) => ({
          count,
          value: traitValue,
        })),
      }))}
    />
  );
}

function QueryLoader({
  attributesQueryRef,
}: {
  attributesQueryRef: PreloadedQuery<useGenerativeSeriesPageAttributesQuery>;
}) {
  const data = usePreloadedQuery<useGenerativeSeriesPageAttributesQuery>(
    generativeSeriesAttributesQuery,
    attributesQueryRef
  );

  if (data.attributesForSeries == null) {
    return null;
  }

  return (
    <FragmentLoader attributesForSeriesResponse={data.attributesForSeries} />
  );
}

type Props = {
  attributesQueryRef: PreloadedQuery<useGenerativeSeriesPageAttributesQuery>;
  maxWidth?: number;
};

export default function GenerativeSeriesFilters({
  attributesQueryRef,
  maxWidth,
}: Props) {
  return (
    <div className={styles.container} style={{ maxWidth }}>
      <GenerativeSeriesPriceRangeFilter />
      <GenerativeSeriesAvailabilityFilter />
      <GenerativeSeriesContentTypeFilter />
      {/* TODO: do we want a nicer suspense? */}
      <Suspense fallback={null}>
        <QueryLoader attributesQueryRef={attributesQueryRef} />
      </Suspense>
    </div>
  );
}
