import graphql from "babel-plugin-relay/macro";
import useExploreContext from "hooks/useExploreContext";
import { useLazyLoadQuery, usePaginationFragment } from "react-relay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import { EXPLORE_SERIES_PAGE_SIZE } from "constants/PageSizes";
import { ExploreSeriesGridQuery } from "components/pages/explore/__generated__/ExploreSeriesGridQuery.graphql";
import SeriesGridFullWidth from "components/series/SeriesGridFullWidth";
import SeriesCard from "components/series/SeriesCard";
import { ExploreSeriesGrid_Query$key } from "components/pages/explore/__generated__/ExploreSeriesGrid_Query.graphql";
import { ExploreSeriesGridPaginationQuery } from "components/pages/explore/__generated__/ExploreSeriesGridPaginationQuery.graphql";
import { range } from "formfn-shared/dist/utils/range";
import SeriesCardLoadingSkeleton from "components/series/SeriesCardLoadingSkeleton";
import getSeriesOrderByClauseForSortOrder from "utils/explore/getSeriesOrderByClauseForSortOrder";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import useLoadNextOnBottomScroll from "hooks/useLoadNextOnBottomScroll";

const query = graphql`
  # IMPORTANT: query name must be kept in-sync with getGraphqlUrl and getGraphqlUrlV2
  query ExploreSeriesGridQuery(
    $after: String
    $first: Int!
    $orderBy: [Series_order_by!]
    $where: Series_bool_exp
  ) {
    ...ExploreSeriesGrid_Query
  }
`;

const fragment = graphql`
  fragment ExploreSeriesGrid_Query on query_root
  # IMPORTANT: query name must be kept in-sync with getGraphqlUrl and getGraphqlUrlV2
  @refetchable(queryName: "ExploreSeriesGridPaginationQuery") {
    Series_connection(
      after: $after
      first: $first
      order_by: $orderBy
      where: $where
    ) @connection(key: "ExploreSeriesGrid_Series_connection") {
      edges {
        node {
          id

          ...SeriesCard_Series
        }
      }
    }
  }
`;

const NUM_SKELETON_TO_LOAD_WHEN_PAGINATING = 12;

function Inner({ gridQuery }: { gridQuery: ExploreSeriesGrid_Query$key }) {
  const { data, hasNext, isLoadingNext, loadNext } = usePaginationFragment<
    ExploreSeriesGridPaginationQuery,
    ExploreSeriesGrid_Query$key
  >(fragment, gridQuery);

  useLoadNextOnBottomScroll(
    hasNext && !isLoadingNext,
    loadNext,
    EXPLORE_SERIES_PAGE_SIZE
  );

  // TODO[@arcticmatt]: remove this after figuring out root cause
  if (data?.Series_connection == null) {
    logError(
      AnalyticsEvent.RelayUnexpectedUndefined,
      "Unexpected undefined in ExploreSeriesGrid",
      {
        data,
      }
    );
    return null;
  }

  return (
    <SeriesGridFullWidth>
      {data.Series_connection.edges.map(({ node }) => (
        <SeriesCard key={node.id} series={node} />
      ))}
      {isLoadingNext &&
        range(NUM_SKELETON_TO_LOAD_WHEN_PAGINATING).map((val) => (
          <SeriesCardLoadingSkeleton key={val} />
        ))}
    </SeriesGridFullWidth>
  );
}

export default function ExploreSeriesGrid(): Maybe<JSX.Element> {
  const { sortOrderForSeries } = useExploreContext();

  const data = useLazyLoadQuery<ExploreSeriesGridQuery>(query, {
    first: EXPLORE_SERIES_PAGE_SIZE,
    orderBy: getSeriesOrderByClauseForSortOrder(sortOrderForSeries),
  });

  return <Inner gridQuery={data} />;
}
