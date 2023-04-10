import graphql from "babel-plugin-relay/macro";
import {
  ExploreCreatorsGridQuery,
  ExploreCreatorsSortOrder,
} from "components/pages/explore/__generated__/ExploreCreatorsGridQuery.graphql";
import useExploreContext from "hooks/useExploreContext";
import { useLazyLoadQuery, usePaginationFragment } from "react-relay";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ExploreCreatorCard from "components/pages/explore/ExploreCreatorCard";
import CreatorsGrid from "components/misc/CreatorsGrid";
import { ExploreCreatorsGridPaginationQuery } from "components/pages/explore/__generated__/ExploreCreatorsGridPaginationQuery.graphql";
import { ExploreCreatorsGrid_Query$key } from "components/pages/explore/__generated__/ExploreCreatorsGrid_Query.graphql";
import { EXPLORE_CREATORS_PAGE_SIZE } from "constants/PageSizes";
import ExploreCreatorCardLoadingSkeleton from "components/pages/explore/ExploreCreatorCardLoadingSkeleton";
import { range } from "formfn-shared/dist/utils/range";
import logError from "utils/analytics/logError";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import useLoadNextOnBottomScroll from "hooks/useLoadNextOnBottomScroll";

const query = graphql`
  query ExploreCreatorsGridQuery(
    $after: String
    $first: Int!
    $input: UsersForExploreInput!
  ) {
    ...ExploreCreatorsGrid_Query
  }
`;

const fragment = graphql`
  fragment ExploreCreatorsGrid_Query on query_root
  @refetchable(queryName: "ExploreCreatorsGridPaginationQuery") {
    usersForExplore {
      users(after: $after, first: $first, input: $input)
        @connection(key: "ExploreCreatorsGrid_Query_users") {
        edges {
          node {
            user {
              id
            }

            ...ExploreCreatorCard_UserAndMetadataAccounts
          }
        }
      }
    }
  }
`;

function Inner({ gridQuery }: { gridQuery: ExploreCreatorsGrid_Query$key }) {
  const { data, hasNext, isLoadingNext, loadNext } = usePaginationFragment<
    ExploreCreatorsGridPaginationQuery,
    ExploreCreatorsGrid_Query$key
  >(fragment, gridQuery);

  useLoadNextOnBottomScroll(
    hasNext && !isLoadingNext,
    loadNext,
    EXPLORE_CREATORS_PAGE_SIZE
  );

  // TODO[@arcticmatt]: remove this after figuring out root cause
  if (data?.usersForExplore?.users == null) {
    logError(
      AnalyticsEvent.RelayUnexpectedUndefined,
      "Unexpected undefined in ExploreCreatorsGrid",
      {
        data,
      }
    );
    return null;
  }

  return (
    <CreatorsGrid>
      {data.usersForExplore.users.edges.map(
        ({ node: userAndMetadataAccounts }) => (
          <ExploreCreatorCard
            key={userAndMetadataAccounts.user.id}
            userAndMetadataAccounts={userAndMetadataAccounts}
          />
        )
      )}
      {isLoadingNext &&
        range(6).map((val) => <ExploreCreatorCardLoadingSkeleton key={val} />)}
    </CreatorsGrid>
  );
}

export default function ExploreCreatorsGrid(): Maybe<JSX.Element> {
  const { sortOrderForCreators } = useExploreContext();

  const data = useLazyLoadQuery<ExploreCreatorsGridQuery>(query, {
    first: EXPLORE_CREATORS_PAGE_SIZE,
    input: {
      orderBy: sortOrderForCreators as ExploreCreatorsSortOrder,
    },
  });

  return <Inner gridQuery={data} />;
}
